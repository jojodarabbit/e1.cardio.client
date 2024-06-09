import clsx from 'clsx';

import Button from '@/components/Button';
import Input from '@/components/Input';

import styles from './detail.module.scss';
import { useNavigate } from 'react-router-dom';
import { executeGetWithPagination, executePostWithBody } from '@/utils/http-client';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { useAsync } from 'react-use';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TrainerResponseDto } from '@/interfaces/Response/TrainerResponseDto';
import Select, { Option } from '@/components/Select';
import { useState } from 'react';
import { CreateTaskRequestDto } from '@/interfaces/Request/CreateTaskRequestDto';
import toast from 'react-hot-toast';

const TaskDetail = () => {

    const [requestDto, setRequestDto] = useState<CreateTaskRequestDto>(
        {
            taskName: "",
            taskInfomations: "string",
            priority: 1,
            receiverId: 0
        }
    );

    const { value: allTrainer } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<TrainerResponseDto[]> } = await executeGetWithPagination(
                `/api/User/trainers`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            data.data && setRequestDto({
                priority: requestDto.priority,
                receiverId: data.data[0].id,
                taskInfomations: requestDto.taskInfomations,
                taskName: requestDto.taskName
            })
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const createTask = async () => {
        try {
            if (requestDto.priority === 0) {
                toast.error("Vui lòng chọn độ ưu tiên của nhiệm vụ")
                return
            }
            if (requestDto.receiverId === 0) {
                toast.error("Vui lòng chọn người nhận nhiệm vụ")
                return
            }
            if (requestDto.taskName === "") {
                toast.error("Vui lòng nhập tên nhiệm vụ")
                return
            }
            if (requestDto.taskInfomations === "string") {
                toast.error("Vui lòng nhập thông tin nhiệm vụ")
                return
            }
            const { data }: { data: BaseResponseDto<string> } = await executePostWithBody(`/api/Task/`, requestDto);
            if (data.hasError === false) {
                toast.success('Tạo nhiệm vụ thành công');
                navigate('/tasks');
            }
            else {
                toast.error('Tạo nhiệm vụ thất bại');
            }
            console.log(requestDto)
        } catch (error) {
            // toast.error('Update Task Error!');
        } finally {
            // navigate('/tasks');
        }
    }

    const handleInputChange = (key: keyof CreateTaskRequestDto, value: string | number) => {
        // if(key === 'receiverId' && value === ''){
        //     console.log(key, value)
        //     setRequestDto((prev) => ({ ...prev, receiverId: 0 }));
        // }else{
        //     setRequestDto((prev) => ({ ...prev, [key]: value }));
        // console.log(key, value)

        // }
        console.log(key, value)
        console.log("avav")
        setRequestDto((prev) => ({ ...prev, [key]: value }));
        console.log(key, value)
    };

    const optionPriorities = [
        { "priorityName": "Low", "value": "Low", "id": 1 },
        { "priorityName": "Medium", "value": "Medium", "id": 2 },
        { "priorityName": "High", "value": "High", "id": 3 },
    ]


    const trainersOptions: Option[] = allTrainer ? allTrainer.map((trainer) => ({ label: trainer.lastName + " " + trainer.firstName, value: trainer.id })) : [];

    const { value: trainer } = useAsync(async () => {
        try {
            if (requestDto.receiverId !== 0) {
                const { data }: { data: BaseResponseDto<TrainerResponseDto> } = await executeGetWithPagination(
                    `/api/User/${requestDto.receiverId}`,
                    { pageIndex: 1, pageSize: 1000000 },
                );
                return data.data;
            }
        } catch (error) {
            console.error(error);
        }
    }, [requestDto.receiverId]);

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/tasks');
    };

    const priorityOptions: Option[] = optionPriorities.map((item) => ({ label: item.priorityName, value: item.id }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Nhiệm vụ</span>
            </div>
            <div className={styles.form}>
                <div>
                    <div className={styles.cardsuperbig}>
                        <div className={styles.title}>
                            <span>Thông tin nhiệm vụ</span>
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles['group-13']}>
                                <div className={styles.tools}>
                                    {/* <div className={styles.tools}> Khách hàng </div> */}
                                </div>
                                <Input
                                    label="Tên nhiệm vụ"
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('taskName', String(value))}
                                    defaultValue={requestDto.taskName}
                                />
                                <div className={styles.flexbox}>
                                    <Select
                                        className={styles.input}
                                        label="Độ ưu tiên"
                                        options={priorityOptions}
                                        onChange={
                                            (value) => {
                                                console.log(value);
                                                handleInputChange('priority', Number(value));
                                            }
                                        }
                                        defaultValue={1}
                                    />
                                </div>
                            </div>
                            <div className={styles['group-1']}>
                                <div className={styles.tools}>
                                    {/* <div className={styles.tools}> Khách hàng </div> */}
                                </div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={""}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(_, editor) => {
                                        const data = editor.getData();
                                        handleInputChange("taskInfomations", data)
                                    }}

                                // onBlur={ ( event, editor ) => {
                                //     console.log( 'Blur.', editor );
                                // } }
                                // onFocus={ ( event, editor ) => {
                                //     console.log( 'Focus.', editor );
                                // } }

                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Khach Hang */}
                <div>
                    <div className={styles.cardsmall}>
                        <div className={styles.title}>
                            <span>Người nhận nhiệm vụ</span>
                            {allTrainer && <Select
                                className={styles.input}
                                options={trainersOptions}
                                onChange={(value) => { handleInputChange("receiverId", Number(value)) }}
                                defaultValue={0}
                            />}
                            {/* <Select
                                className={styles.input}
                                label="Độ ưu tiên"
                                options={priorityOptions}
                                onChange={
                                    (value) => {
                                        console.log(value);
                                        handleInputChange('priority', Number(value));
                                        }
                                    }
                                defaultValue={1}
                            /> */}
                        </div>
                        {allTrainer && <div className={styles.inputs}>
                            <div className={styles['group-1']}>
                                <div className={styles.tools}>
                                    {/* <div className={styles.tools}> Khách hàng </div> */}
                                </div>
                                <div className={styles.card__content}>
                                    <Input
                                        label="Họ và tên"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={trainer?.lastName + " " + trainer?.firstName || ""}
                                        disabled
                                    />
                                    <Input
                                        label="Số điện thoại"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={trainer?.phone || ""}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className={styles['group-1']}>
                                <div className={styles.tools}>
                                    {/* <div className={styles.tools}> Khách hàng </div> */}
                                </div>
                                <div className={styles.card__content}>
                                    <Input
                                        label="Email"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={trainer?.email || ""}
                                        disabled
                                    />
                                    <Input
                                        label="Địa chỉ"
                                        className={styles.input}
                                        handleChange={() => { }}
                                        value={trainer?.address || ""}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.group}>
                    <div />
                    <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick} />
                    <Button
                        content={<span>Lưu</span>}
                        className={styles.button}
                        onClick={() => {
                            // updateTask()
                            createTask();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;