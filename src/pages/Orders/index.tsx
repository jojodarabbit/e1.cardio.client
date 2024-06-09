import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PackageType from '@/components/PackageType';
import TableDataList from '@/components/TableDataList';
import { EPackageType } from '@/constants/packages';

import styles from './orders.module.scss';
import SearchBox from '@/components/SearchBox/SearchBox';
import { executeDeleteWithBody } from '@/utils/http-client';
import toast from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { SelledPackageResponseDto } from '@/interfaces/Response/SelledPackageResponseDto';
import TableAction from '@/components/TableAction';
import { confirmAlert } from 'react-confirm-alert';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';

const Order = () => {
    let packageId = 0;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [refreshTable, setRefreshTable] = useState(false);
    const options = {
        title: 'XÁC NHẬN',
        message: 'Bạn có muốn xóa đơn hàng?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
                try {
                    
                    const { data }: { data: BaseResponseDto<string> } = await executeDeleteWithBody(`/api/PackageConsultant/${packageId}`);
                    if(data.hasError === false){
                        toast.success('Xóa đơn hàng thành công!');
                    }
                    else{
                        toast.error('Xóa đơn hàng thất bại!');
                    }
                    setRefreshTable(!refreshTable);
                } catch (error) {
                    // toast.error('Lỗi khi xóa đơn hàng!');
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

    const cols = useMemo<ColumnDef<SelledPackageResponseDto>[]>(
        () => [
            { header: 'Gói tập', accessorKey: 'demoPackage.packageName' },
            { header: 'Khách hàng', accessorKey: 'customer.firstName',
              cell: (x) => (
                <div>{x.cell.row.original.consultees.lastName + " " + x.cell.row.original.consultees.firstName}</div>
            ),
            },
            { header: 'Nhân viên tư vấn', accessorKey: 'staff.firstName',
            cell: (x) => (
                <div>{x.cell.row.original.consultants.lastName + " " + x.cell.row.original.consultants.firstName}</div>
            ),
            },
            { header: 'Số ngày tập', accessorKey: 'demoPackage.numberOfDays' },
            { header: 'Số buổi tập', accessorKey: 'demoPackage.numberOfSessions' },
            {
                header: 'Loại',
                accessorKey: 'demoPackage.type',
                cell: (value) => (
                    <PackageType text={value.getValue() as string} type={value.getValue() as EPackageType} />
                ),
            },
            { header: 'Cơ sở', accessorKey: 'demoPackage.branch.branchName' },
            {
                header: 'Thao tác',
                cell: (x) => (
                    <TableAction
                        onViewClick={()=>
                        {
                        navigate('/consultant-package/view', {
                            state: { 
                                "id": x.cell.row.original.id,
                                }
                              } 
                          );
                        }
                        }
                        onEditClick={() => {
                            navigate('/consultant-package/edit', {
                                state: { 
                                    "id": x.cell.row.original.id,
                                    "demoPackageId": x.cell.row.original.demoPackage.id,
                                    "schedules": x.cell.row.original.schedules
                                    }
                                  } 
                              );
                        }}
                        onDeleteClick={() => handleDeleteClick(x.cell.row.original.id)}
                    />
                ),  
            },
        ],
        [searchTerm, refreshTable],
    );

    const handleDeleteClick = (id: number) => {
        packageId = id;
        confirmAlert(options);
    };
    const navigate = useNavigate();

    const handleChangeSearchBox = (x : any) => {
        console.log(x.target.value);
        setSearchTerm(x.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>Đơn hàng</span>
                </div>
                <SearchBox 
                onChange={(x) => handleChangeSearchBox(x)} 
                value={searchTerm}/>
            </div>
            <div className={styles.table}>
                <TableDataList cols={cols} path={`/api/PackageConsultant?query=${searchTerm}`} key={searchTerm} isRefresh={refreshTable}/>
            </div>
        </div>
    );
};

export default Order;
