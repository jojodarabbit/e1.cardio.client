import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import TableDataList from '@/components/TableDataList';
import { UpdatePackageRequestDto } from '@/interfaces/Response/LessonPlanResponseDto';

import styles from './packages.module.scss';
import TableAction from '@/components/TableAction';
import SearchBox from '@/components/SearchBox/SearchBox';
import { executeDeleteWithBody } from '@/utils/http-client';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { ETaskType } from '@/constants/task';
import TaskType from '@/components/TaskType';

const Packages = () => {
    let packageId = 0;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [refreshTable, setRefreshTable] = useState(false);
    const options = {
        title: 'XÁC NHẬN',
        message: 'Bạn có muốn xóa gói tập?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
                try {
                    
                    const { data }: { data: BaseResponseDto<string> } = await executeDeleteWithBody(`/api/Package/${packageId}`);
                    if(data.hasError === false){
                        toast.success('Xóa giáo án thành công');
                    }
                    else{
                        toast.error('Xóa giáo án thất bại');
                    }
                    setRefreshTable(!refreshTable);
                } catch (error) {
                    // toast.error('Delete Package Error!');
                } finally {
                    setSearchTerm("");
                    // setIsLoading(false);
                }
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        overlayClassName: "overlay-custom-class-name"
      };

    const handleDeleteClick = (id: number) => {
        packageId = id;
        confirmAlert(options);
    };
    
    const getStatus = (statusText: number) => {
        if(statusText == 1){
            return "InProcess"
        }
        else if(statusText == 2)
        {
            return "Finished"
        }
    }
    const cols = useMemo<ColumnDef<UpdatePackageRequestDto>[]>(
        () => [
            { header: 'Tên giáo án', accessorKey: 'packageName' },
            { header: 'HLV hướng dẫn', accessorKey: 'packageTrainer',
                cell: (x) => (
                    x.cell.row.original.packageTrainer?.lastName === undefined ? "---" :
                    x.cell.row.original.packageTrainer?.lastName + " " + x.cell.row.original.packageTrainer?.firstName
                ),
            },
            { header: 'Staff theo dõi', accessorKey: 'packageFollower',
                cell: (x) => (
                    x.cell.row.original.packageFollower?.lastName === undefined ? "---" :
                    x.cell.row.original.packageFollower?.lastName + " " + x.cell.row.original.packageFollower?.firstName
                ),
             },
            { header: 'HLV tạo', accessorKey: 'packageCreator.firstName'
                ,cell: (x) => (
                    x.cell.row.original.packageCreator?.lastName === undefined ? "---" :
                    x.cell.row.original.packageCreator?.lastName + " " + x.cell.row.original.packageCreator?.firstName
                ),
            },
            {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: (value ) => (
                    <TaskType text={getStatus(value.getValue() as number) as string} type={getStatus(2) as ETaskType} />
                ),
            },
            {
                header: 'Thao tác',
                cell: (x) => (
                    <TableAction
                        onEditClick={()=>
                                {
                                navigate(`/lessonplan/update/${x.cell.row.original.id}`, {
                                    state: { 
                                        "packageId": x.cell.row.original.id,
                                        }
                                      } 
                                  );
                                }
                        }
                        onDeleteClick={() => handleDeleteClick(x.cell.row.original.id)}
                    />
                ),  
            },
        ],
        [searchTerm, refreshTable],
    );

    const navigate = useNavigate();
    const handleCreatePackageClick = () => {
        navigate('/lessonplan/create');
    };
    const handleChangeSearchBox = (x : any) => {
        console.log(x.target.value);
        setSearchTerm(x.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>Giáo án</span>
                </div>
                <SearchBox 
                onChange={(x) => handleChangeSearchBox(x)} 
                value={searchTerm}/>
                <div>
                    <Button
                        content={<span>Tạo giáo án</span>}
                        className={styles.button}
                        onClick={handleCreatePackageClick}
                    />
                </div>
            </div>
            <div className={styles.table}>
                <TableDataList cols={cols} path={`/api/Package?query=${searchTerm}`} key={searchTerm} isRefresh={refreshTable}/>
            </div>
        </div>
    );
};

export default Packages;
