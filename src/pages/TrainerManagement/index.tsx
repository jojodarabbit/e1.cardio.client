import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import TableDataList from '@/components/TableDataList';
import { UserManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';

import styles from './trainer-management.module.scss';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import TableActionOnlyView from '@/components/TableActionOnlyView';

const TrainerManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const cols = useMemo<ColumnDef<UserManagementResponseDto>[]>(
        () => [
            { header: 'Họ và tên', accessorKey: 'firstName',
                cell: (x) => (
                    <div>{x.cell.row.original.lastName + " " + x.cell.row.original.firstName}</div>
            ),
            },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Số điện thoại', accessorKey: 'phone' },
            { header: 'Ngày sinh', accessorKey: 'dob',
            cell: (value) => (
                new Date(value.getValue() as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
            ),},
            { header: 'Địa chỉ', accessorKey: 'address' },
            { header: 'Số năm kinh nghiệm', accessorKey: 'yoe' },
            {
                header: 'Thao tác',
                cell: (x) => (
                    <TableActionOnlyView
                        onViewClick={() => {                      
                            navigate(`/persondetail/${x.cell.row.original.id}`, {
                                state: { 
                                    "personId": x.cell.row.original.id,
                                    "currentPage": "/trainer-management"
                                    }
                                } 
                            );
                            }}
                    />
                ),
            },
        ],
        [searchTerm],
    );

    const handleChangeSearchBox = (x : any) => {
        console.log(x.target.value);
        setSearchTerm(x.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>Huấn luyện viên</span>
                </div>
                <SearchBox 
                onChange={(x) => handleChangeSearchBox(x)} 
                value={searchTerm}/>
            </div>
            <div className={styles.table}>
                <TableDataList cols={cols} path={`/api/User/Trainers?query=${searchTerm}`} key={searchTerm} />
            </div>
        </div>
    );
};

export default TrainerManagement;
