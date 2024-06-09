import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import TableDataList from '@/components/TableDataList';
import { CustomerManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';
import 'font-awesome/css/font-awesome.min.css';
import 'reactjs-popup/dist/index.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import styles from './customer-management.module.scss';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import TableActionOnlyView from '@/components/TableActionOnlyView';


const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const navigate = useNavigate();

    const cols = useMemo<ColumnDef<CustomerManagementResponseDto>[]>(
        () => [
            { header: 'Họ và tên', accessorKey: 'firstName',
                cell: (x) => (
                    <div>{x.cell.row.original.lastName + " " + x.cell.row.original.firstName}</div>
            ),
            },
            { header: 'Số điện thoại', accessorKey: 'phone' },
            { header: 'Địa chỉ', accessorKey: 'address' },
            { header: 'Ngày sinh', accessorKey: 'dob',
                cell: (value) => (
                    new Date(value.getValue() as Date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
            ),
            },
                        { header: 'Chiều cao', accessorKey: 'height' },
            { header: 'Cân nặng', accessorKey: 'weight' },
            {
                header: 'Thao tác',
                cell: (x) => (
                    <TableActionOnlyView
                        onViewClick={() => {                      
                        navigate(`/persondetail/${x.cell.row.original.id}`, {
                            state: { 
                                "personId": x.cell.row.original.id,
                                "currentPage": "/customer-management"
                                }
                            } 
                        );
                        }}
                    />
                ),
            },
        ],
        [],
    );

    const handleChangeSearchBox = (x : any) => {
        console.log(x.target.value);
        setSearchTerm(x.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>Khách hàng</span>
                </div>
                <SearchBox 
                onChange={(x) => handleChangeSearchBox(x)} 
                value={searchTerm}/>
            </div>
            <div className={styles.table}>
                <TableDataList cols={cols} path={`/api/User/customers?query=${searchTerm}`} key={searchTerm} />
            </div>
        </div>
    );
};

export default CustomerManagement;
