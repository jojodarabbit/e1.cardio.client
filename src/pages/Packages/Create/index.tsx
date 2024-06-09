import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

import Button from '@/components/Button';
import { TrainingPrograms } from '@/components/Icons';
import Input from '@/components/Input';
import Loader from '@/components/Loading/Loader';
import Select, { Option } from '@/components/Select';
import Textarea from '@/components/Textarea';
import { CreatePackageRequestDto, defaultRequest } from '@/interfaces/Request/CreatePackageRequestDto';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { BranchResponseDto } from '@/interfaces/Response/BranchResponseDto';
import { executeGetWithPagination, executePostWithBody } from '@/utils/http-client';

import styles from './create.module.scss';
import { useNavigate } from 'react-router-dom';
import { getValue } from '@/utils/application';

const CreatePackage = () => {
    const [requestDto, setRequestDto] = useState<CreatePackageRequestDto>(defaultRequest);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const { loading, value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<BranchResponseDto[]> } = await executeGetWithPagination(
                '/api/Branch',
                { pageIndex: 1, pageSize: 1000000 },
            );
            data.data && setRequestDto({
                // priority: requestDto.priority,
                // receiverId: data.data[0].id,
                // taskInfomations: requestDto.taskInfomations,
                // taskName: requestDto.taskName
                branchId: data.data[0].id,
                descriptions: requestDto.descriptions,
                numberOfDays: requestDto.numberOfDays,
                numberOfSessions: requestDto.numberOfSessions,
                packageName: requestDto.packageName,
                packagePrice: requestDto.packagePrice,
                type: requestDto.type
            })
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const options: Option[] = value ? value.map((branch) => ({ label: branch.branchName, value: branch.id })) : [];

    const handleInputChange = (key: keyof CreatePackageRequestDto, value: string | number) => {
        setRequestDto((prev) => ({ ...prev, [key]: value }));
    };

    const handleCreateClick = async () => {
        try {
            setIsLoading(true);
            const { data }: { data: BaseResponseDto<string> } = await executePostWithBody('/api/DemoPackage', requestDto);
            if(data.hasError === false){
                toast.success('Tạo gói tập thành công');
                navigate('/packages');
            }
            else{
                toast.error('Tạo gói tập thất bại');
            }
            // console.log(requestDto);
        } catch (error) {
            // toast.error('Create Package Error!');
        } finally {
            setIsLoading(false);
        }
    };
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/packages');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <TrainingPrograms />
                <span>Gói tập </span>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.form}>
                    <div className={styles.inputs}>
                        <div className={styles['group-1']}>
                            <Input
                                label="Gói tập"
                                className={styles.input}
                                handleChange={(_, value) => handleInputChange('packageName', String(value))}
                            />
                            <Select
                                    className={styles.input}
                                    label="Cơ sở"
                                    options={options}
                                    onChange={(value) => handleInputChange('branchId', Number(value))} defaultValue={0}                            />
                            <Textarea
                                label="Mô tả"
                                className={styles.input}
                                handleChange={(_, value) => handleInputChange('descriptions', String(value))}
                            />
                        </div>
                        <div className={styles['group-2']}>
                            <Input
                                label="Giá"
                                className={styles.input}
                                fixedplaceholder="đ"
                                handleChange={(_, value) => handleInputChange('packagePrice', String(value))}
                                type="number"
                            />
                            <Input
                                label="Số buổi"
                                className={styles.input}
                                fixedplaceholder="buổi"
                                handleChange={(_, value) => handleInputChange('numberOfSessions', String(value))}
                                type="number"
                            />
                            <Input
                                label="Số ngày dự kiến hoàn thành"
                                className={styles.input}
                                fixedplaceholder="ngày"
                                handleChange={(_, value) => handleInputChange('numberOfDays', String(value))}
                                type="number"
                            />
                            <Input
                                label="Loại gói tập"
                                className={styles.input}
                                handleChange={(_, value) => handleInputChange('type', String(value))}
                            />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.group}>
                            <Button content={<span>Hủy</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick}/>
                            {canDelete && <Button
                                content={<span>Tạo gói tập</span>}
                                className={styles.button}
                                onClick={handleCreateClick}
                                loading={isLoading}
                            />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePackage;
