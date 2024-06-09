import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import TaskType from '@/components/TaskType';
import TableDataList from '@/components/TableDataList';
import { TaskResponseDto } from '@/interfaces/Response/TaskResponseDto';

import styles from './packages.module.scss';
import TableAction from '@/components/TableAction';
import SearchBox from '@/components/SearchBox/SearchBox';
import { executeDeleteWithBody } from '@/utils/http-client';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ETaskType } from '@/constants/task';
import PriorityType from '@/components/PriorityType';
import { EPriorityType } from '@/constants/priority';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { getValue } from '@/utils/application';

const Task = () => {
    let deleteTaskID = 0;
    const token = getValue('token');
    const base64UrlDecode = (input: string) => {
        // Replace characters not supported in base64url and convert to base64
        const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        // Pad the base64 string with '=' until its length is a multiple of 4
        const padded = base64.padEnd((base64.length + 3) & ~3, '=');
        // Decode the base64 string
        return atob(padded);
    }

    const decodeJwt = (token: string) => {
        // Split the token into header, payload, and signature
        const [headerEncoded, payloadEncoded, signature] = token.split('.');

        // Decode header and payload
        const header = JSON.parse(base64UrlDecode(headerEncoded));
        const payload = JSON.parse(base64UrlDecode(payloadEncoded));

        return { header, payload, signature };
    }
    let userRole;
    let canDelete: boolean;
    if(token !== null){
        userRole = decodeJwt(token || "");
   
    }
    if(userRole?.payload.roles !== "Trainer"){
        canDelete = true;
    }
    else{
        canDelete = false;
    }
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [refreshTable, setRefreshTable] = useState(false);
    const options = {
        title: 'XÁC NHẬN',
        message: 'Bạn có muốn xóa nhiệm vụ?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
                try {
                    const { data }: { data: BaseResponseDto<string> } = await executeDeleteWithBody(`/api/Task/${deleteTaskID}`);
                    if(data.hasError === false){
                        toast.success('Xóa nhiệm vụ thành công');
                    }
                    else{
                        toast.error('Có lỗi khi xóa nhiệm vụ');
                    }
                    setRefreshTable(!refreshTable);
                } catch (error) {
                    // toast.error('Có lỗi khi xóa nhiệm vụ');
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
        deleteTaskID = id;
        confirmAlert(options);
    };

    const cols = useMemo<ColumnDef<TaskResponseDto>[]>(
        () => [
            { header: 'Tên nhiệm vụ', accessorKey: 'taskName' },
            { header: 'Độ ưu tiên', accessorKey: 'priority',
                cell: (value) => (
                    <PriorityType text={value.getValue() as string} type={value.getValue() as EPriorityType} />
                ),
            },
            { header: 'Người giao nhiệm vụ', accessorKey: 'assigners',
                cell: (x) => (
                <div>{x.cell.row.original.assigners.lastName + " " + x.cell.row.original.assigners.firstName}</div>
                )
            },
            { header: 'Người nhận nhiệm vụ', accessorKey: 'numberOfSessions',
                cell: (x) => (
                <div>{x.cell.row.original.receivers.lastName + " " + x.cell.row.original.receivers.firstName}</div>
                )
            },
            // { header: 'Trạng thái', accessorKey: 'numberOfSessions' },
            // {
            //     header: 'Giá',
            //     accessorKey: 'packagePrice',
                
            //     cell: (value) => (
            //         formatNumber(value.getValue() as number)
            //     )
            // },
            {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: (value) => (
                    <TaskType text={value.getValue() as string} type={value.getValue() as ETaskType} />
                ),
            },
            {
                header: 'Thao tác',
                cell: (x) => (
                    <TableAction
                        onEditClick={()=>
                                {
                                navigate(`/tasks/view/${x.cell.row.original.id}`
                                , {
                                    state: { 
                                        "taskId": x.cell.row.original.id,
                                        "receiverId": x.cell.row.original.receivers.id
                                        }
                                      } 
                                  );
                                }
                        }
                        onDeleteClick={() => handleDeleteClick(x.cell.row.original.id)}
                        canDelete ={canDelete}
                    />
                ),  
            },
        ],
        [searchTerm, refreshTable],
    );

    const navigate = useNavigate();
    const handleCreatePackageClick = () => {
        navigate('/tasks/create');
    };
    const handleChangeSearchBox = (x : any) => {
        console.log(x.target.value);
        setSearchTerm(x.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>Nhiệm vụ</span>
                </div>
                <SearchBox 
                onChange={(x) => handleChangeSearchBox(x)} 
                value={searchTerm}/>
                {userRole && userRole?.payload.roles !== "Trainer" &&<div>
                    <Button
                        content={<span>Tạo nhiệm vụ</span>}
                        className={styles.button}
                        onClick={handleCreatePackageClick}
                    />
                </div>}
            </div>
            <div className={styles.table}>
                <TableDataList cols={cols} path={`/api/Task?query=${searchTerm}`} key={searchTerm} isRefresh={refreshTable}/>
            </div>
        </div>
    );
};

export default Task;
