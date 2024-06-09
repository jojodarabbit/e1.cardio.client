import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { PaginationRequest } from '@/interfaces/Request/PaginationRequestDto';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { executeGetWithPagination } from '@/utils/http-client';

import { Table } from '../Table';

interface TableDataListProps<T> {
    cols: ColumnDef<T>[];
    path: string;
    pageSize?: number;
    mockData?: T[];
    isRefresh?: boolean;
}

const TableDataList = <T extends object>(props: TableDataListProps<T>) => {
    const { cols, path, pageSize = 10, mockData, isRefresh} = props;

    const [isLoading, setIsLoading] = useState(false);
    const [dataRendering, setDataRendering] = useState<T[]>([]);

    const fetchData = useCallback(async (pagination: PaginationRequest) => {
        setDataRendering(mockData ?? []);

        try {
            setIsLoading(true);
            const { data }: { data: BaseResponseDto<T[]> } = await executeGetWithPagination(path, {
                pageIndex: pagination.pageIndex,
                pageSize
            });
            setDataRendering(data.data);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [isRefresh]);

    return (
        <Table<T> data={dataRendering} columns={cols} pageSize={pageSize} fetchData={fetchData} loading={isLoading} />
    );
};

export default TableDataList;
