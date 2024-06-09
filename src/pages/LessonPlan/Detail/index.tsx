import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

import Button from '@/components/Button';
import { TrainingPrograms } from '@/components/Icons';
import Input from '@/components/Input';
import Loader from '@/components/Loading/Loader';
import Select, { Option } from '@/components/Select';
import { sessionUpdate } from '@/interfaces/Response/LessonPlanResponseDto';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { BranchResponseDto } from '@/interfaces/Response/BranchResponseDto';
import { executeGetWithPagination, executePostWithBody, executePutWithBody } from '@/utils/http-client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './create.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Schedule, session, sessionItems } from '@/interfaces/Response/LessonPlanResponseDto';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faDeleteLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Textarea from '@/components/Textarea';
import { UpdatePackageRequestDto } from '@/interfaces/Response/LessonPlanResponseDto';
import { CustomerManagementResponseDto, StaffManagementResponseDto } from '@/interfaces/Response/UserManagementResponseDto';
import { TrainerResponseDto } from '@/interfaces/Response/TrainerResponseDto';
const CreatePackage = () => {

    const { id } = useParams();
    let packageId = id;
    const [customerId, setCustomerId] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listSchedules, setListSchedules] = useState<Schedule[]>([]);
    const [listSession, setListSession] = useState<sessionUpdate[]>([]);
    const [scheduleItem, setScheduleItem] = useState<Schedule>({
        day: 0,
        time: {
            hour: 0,
            minute: 0
        }
    });
    const [_, setSessionTemp] = useState<session>({
        descriptions: '',
        energyPoint: 0,
        outcome: '',
        sessionItems: [],
        title: ''
    });
    const [requestDto, setRequestDto] = useState<UpdatePackageRequestDto>({
        branchId: 0,
        hasCustomer: false,
        descriptions: '',
        numberOfDays: 0,
        numberOfSessions: 0,
        packageName: '',
        imageUrl: '',
        schedules: listSchedules,
        sessions: listSession as sessionUpdate[],
        startDate: new Date(),
        endDate: new Date(),
        packagePrice: 0,
        type: '',
        branch: {
            id: 0,
            branchName: '',
            location: '',
            phone: ''
        },
        id: 0,
        packageCreator: {
            email: '',
            firstName: '',
            id: 0,
            lastName: '',
            phone: '',
        },
        packageFollower: {
            email: '',
            firstName: '',
            id: 0,
            lastName: '',
            phone: '',
        },
        packageFollowerId: 0,
        packageTrainer: {
            email: '',
            firstName: '',
            id: 0,
            lastName: '',
            phone: '',
        },
        packageTrainerId: 0,
        status: 0
    });
    enum DaysOfWeek {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6
    }
    const daysInWeek = [
        { number: 0, date: "Sunday" },
        { number: 1, date: "Monday" },
        { number: 2, date: "Tuesday" },
        { number: 3, date: "Wednesday" },
        { number: 4, date: "Thursday" },
        { number: 5, date: "Friday" },
        { number: 6, date: "Saturday" },
    ]

    const packageStatus = [
        { number: 1, type: "In Process" },
        { number: 2, type: "Finished" }
    ]
    const sessonStatus = [
        { status: 1, type: "In Process" },
        { status: 2, type: "Finished" }
    ]

    const { } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<UpdatePackageRequestDto> } = await executeGetWithPagination(
                `/api/Package/${packageId}`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            setRequestDto(data.data);
            setListSchedules(data.data.schedules);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const daysInWeekOptions: Option[] = daysInWeek ? daysInWeek.map((branch) => ({ label: branch.date, value: branch.number })) : [];
    const packageStatusOptions: Option[] = packageStatus ? packageStatus.map((status) => ({ label: status.type, value: status.number })) : [];
    const sessonStatusOptions: Option[] = sessonStatus ? sessonStatus.map((status) => ({ label: status.type, value: status.status })) : [];

    const useStyles = makeStyles(() => ({
        timePicker: {
            '& .MuiInputBase-root': {
                'height': '52px',
                'overflow': 'hidden',
                'margin-bottom': '12px',
                'background-color': 'white',
                'border-radius': '10px',
            },
        },
    }));
    const classes = useStyles();
    const { loading, value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<BranchResponseDto[]> } = await executeGetWithPagination(
                '/api/Branch',
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const options: Option[] = value ? value.map((branch) => ({ label: branch.branchName, value: branch.id })) : [];
    const { loading: _loading, value: AllStaff } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<StaffManagementResponseDto[]> } = await executeGetWithPagination(
                '/api/User/staffs',
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });
    const { loading: ___loading, value: AllCustomer } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<CustomerManagementResponseDto[]> } = await executeGetWithPagination(
                '/api/User/customers',
                { pageIndex: 1, pageSize: 1000000 },
            );
            setCustomerId(data.data[0].id)
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const staffOptions: Option[] = AllStaff ? AllStaff.map((staff) => ({ label: staff.lastName + " " + staff.firstName, value: staff.id })) : [];
    const customerOptions: Option[] = AllCustomer ? AllCustomer.map((customer) => ({ label: customer.lastName + " " + customer.firstName, value: customer.id })) : [];

    const { loading: __loading, value: AllTrainer } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<TrainerResponseDto[]> } = await executeGetWithPagination(
                '/api/User/trainers',
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });

    const trainerOptions: Option[] = AllTrainer ? AllTrainer.map((trainer) => ({ label: trainer.lastName + " " + trainer.firstName, value: trainer.id })) : [];

    const handleInputChange = (key: keyof UpdatePackageRequestDto, value: string | number) => {
        setRequestDto((prev) => ({ ...prev, [key]: value }));
    };


    const handleUpdateClick = async () => {
        try {
            setIsLoading(true);
            const { data }: { data: BaseResponseDto<string> } = await executePutWithBody(`/api/Package/${packageId}`, requestDto);
            if (data.hasError === false) {
                toast.success('Cập nhật giáo án thành công');
                navigate('/lessonplan');
            }
            else {
                toast.error('Cập nhật giáo án thất bại');
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

    const handleRemoveSchedule = (day: number, time: {
        hour: number,
        minute: number
    }) => {
        console.log({ day, time });
        let i = 0;
        listSchedules.forEach(element => {
            if (element.day === day && element.time === time) {
                let listSchedule: Schedule[] = listSchedules;
                listSchedule.splice(i, 1);
                setListSchedules([...listSchedule])
                let a = requestDto;
                requestDto.schedules = [...listSchedule];
                setRequestDto(a);
            }
            i++;
        });
    }

    const handleRemoveSessonItem = (sesIndex: number, sesItemIndex: number) => {
        let a = requestDto.sessions;
        a[sesIndex].sessionItems = a[sesIndex].sessionItems.filter(x => x !== a[sesIndex].sessionItems[sesItemIndex]);
        setListSession(a);
        setRequestDto({
            ...requestDto,
            sessions: a
        })
        // let a = requestDto.sessions;
        // a[index].sessionItems.push({
        //     description: '',
        //     imageUrl: '',
        //     title: '',
        //     id: 0
        // });
        // setRequestDto({
        //     ...requestDto,
        //     sessions: a
        // })    
    }

    const handleRemoveSesson = (sesIndex: number) => {
        let a = requestDto;
        a.sessions[sesIndex].isActive = false;
        // a.sessions = a.sessions.filter(x => x !== a.sessions[sesIndex]);
        setRequestDto({
            ...requestDto,
            sessions: a.sessions
        })
    }
    const handleAddSchedule = () => {
        const isObjectInList = listSchedules.some(item => item.day === scheduleItem.day && item.time === scheduleItem.time);
        if (isObjectInList == false) {
            setListSchedules([...listSchedules, scheduleItem]);
        }
        let a = requestDto;
        requestDto.schedules = [...listSchedules, scheduleItem];
        setRequestDto(a);
    }
    const handleExerciseChange = (key: keyof sessionItems, value: string | number, sesIndex: number, sesItemIndex: number) => {
        setSessionTemp((prev) => ({ ...prev, [key]: value }));
        let a = requestDto.sessions;
        if (key === "title") {
            a[sesIndex].sessionItems[sesItemIndex].title = value as string
        }
        else if (key === "description") {
            a[sesIndex].sessionItems[sesItemIndex].description = value as string
        }
        setListSession(a)
        setRequestDto({
            ...requestDto,
            sessions: a
        })

    }
    const handleTempSessionChange = (key: keyof sessionUpdate, value: string | number, sesIndex: number) => {
        setSessionTemp((prev) => ({ ...prev, [key]: value }));

        let a = requestDto.sessions;
        if (key === "title") {
            a[sesIndex].title = value as string
        }
        else if (key === "descriptions") {
            a[sesIndex].descriptions = value as string
        }
        else if (key === "energyPoint") {
            a[sesIndex].energyPoint = value as number
        }
        else if (key === "outcome") {
            a[sesIndex].outcome = value as string
        }
        else if (key === "branchId") {
            a[sesIndex].branchId = value as number
        }
        else if (key === "isFinished") {
            a[sesIndex].isFinished = Number(value)
        }
        setRequestDto({
            ...requestDto,
            sessions: a
        })
    };

    const handleAddSession = () => {
        let a = requestDto;
        a.sessions = [...requestDto.sessions, {
            descriptions: '',
            energyPoint: 0,
            outcome: '',
            sessionItems: [],
            title: '',
            branch: {
                branchName: '',
                id: 0,
                location: '',
                phone: ''
            },
            branchId: 0,
            id: 0,
            isActive: true,
            isFinished: 0,
            sessionTrainer: {
                email: '',
                firstName: '',
                id: 0,
                lastName: '',
                phone: ''
            },
            sessionTrainerId: 0
        }]
        setRequestDto({
            ...requestDto,
            sessions: a.sessions
        })
    }
    const addSessionItem = (index: number) => {

        let a = requestDto.sessions;
        a[index].sessionItems.push({
            description: '',
            imageUrl: '',
            title: '',
        });
        setRequestDto({
            ...requestDto,
            sessions: a
        })
    }
    const handleSendInfo = async () => {
        try {
            const request = {
                customerId: customerId,
                packageId: requestDto.id
            }
            setIsLoading(true);
            const { data }: { data: BaseResponseDto<string> } = await executePostWithBody(`/api/Package/order?customerId=${request.customerId}&packageId=${request.packageId}`, {});
            if (data.hasError === false) {
                toast.success('Đã gửi thông tin thành công');
            }
            else {
                toast.error('Gửi thông tin thất bại');
            }
            // console.log(requestDto);
        } catch (error) {
            // toast.error('Create Package Error!');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.flexTitle}>
                    <div className={styles.lessonTitle}>
                        <TrainingPrograms />
                        <span>Giáo án</span>
                    </div>
                    {!requestDto.hasCustomer && <div className={styles.lessonTitle}>
                        <Select
                            className={styles.input}
                            options={customerOptions}
                            onChange={(value) => setCustomerId(Number(value))}
                            defaultValue={customerId}
                            value={customerId}
                        />
                        <Button
                            content={<span>Gửi thông tin</span>}
                            className={styles.button}
                            onClick={handleSendInfo}
                            loading={isLoading}
                        />
                    </div>}
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className={styles.form}>
                        <div className={styles.title}>
                            <span>Thông tin cơ bản</span>
                            <Select
                                className={styles.input}
                                options={packageStatusOptions}
                                onChange={(value) => {
                                    handleInputChange('status', Number(value))
                                }}
                                defaultValue={requestDto.status}
                                value={requestDto.status}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles['group-1']}>
                                <img src="https://pbs.twimg.com/media/F0u_EexaYAAyjp9.jpg" className={styles.avatar} id='profile-pic'></img>
                                <Input
                                    label="Tên giáo án"
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('packageName', String(value))}
                                    defaultValue={requestDto.packageName}
                                />
                                <Select
                                    className={styles.input}
                                    label="Cơ sở"
                                    options={options}
                                    onChange={(value) => handleInputChange('branchId', Number(value))}
                                    defaultValue={requestDto.branch.id}
                                />
                                <div className={styles.timeSelect}>
                                    <Select
                                        className={styles.input}
                                        label="Thời gian tập"
                                        options={daysInWeekOptions}
                                        onChange={(value) => {
                                            setScheduleItem({ day: +value, time: scheduleItem.time })
                                        }}
                                        defaultValue={scheduleItem.day}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                className={classes.timePicker}
                                                onChange={(value) => {
                                                    setScheduleItem({
                                                        day: scheduleItem.day, time: {
                                                            hour: value?.hour() as number,
                                                            minute: value?.minute() as number
                                                        }
                                                    })
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <FontAwesomeIcon icon={faSquarePlus} className={styles.icon} onClick={handleAddSchedule} />
                                </div>
                                <div className={styles.scheduleContainer}>
                                    {requestDto.schedules.map((schedule, index) => (
                                        <div key={index} className={styles.schedule}>
                                            {DaysOfWeek[schedule.day]} - {schedule.time.hour < 10 ? "0" + schedule.time.hour : schedule.time.hour}:{schedule.time.minute < 10 ? "0" + schedule.time.minute : schedule.time.minute}
                                            <FontAwesomeIcon icon={faDeleteLeft} className={styles.iconRemove} onClick={() => handleRemoveSchedule(schedule.day, schedule.time)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className={styles['group-2']}>
                                        {/* <Input
                                        label="Giá"
                                        className={styles.input}
                                        fixedplaceholder="đ"
                                        handleChange={(_, value) => handleInputChange('packagePrice', String(value))}
                                        type="number"
                                    /> */}
                                        {requestDto.numberOfSessions && <Input
                                            label="Số buổi"
                                            className={styles.input}
                                            fixedplaceholder="buổi"
                                            handleChange={(_, value) => handleInputChange('numberOfSessions', String(value))}
                                            type="number"
                                            defaultValue={requestDto.numberOfSessions}
                                        />}
                                    </div>
                                    <div className={styles['group-2']}>
                                        {/* <Input
                                        label="Loại gói tập"
                                        className={styles.input}
                                        handleChange={(_, value) => handleInputChange('type', String(value))}
                                    /> */}
                                        {requestDto.numberOfDays && <Input
                                            label="Số ngày dự kiến hoàn thành"
                                            className={styles.input}
                                            fixedplaceholder="ngày"
                                            handleChange={(_, value) => handleInputChange('numberOfDays', String(value))}
                                            type="number"
                                            defaultValue={requestDto.numberOfDays}
                                        />}
                                    </div>
                                    <div className={styles['group-2']}>
                                        {requestDto.startDate && <Input label="Ngày bắt đầu" className={styles.input}
                                            handleChange={(_, x) => {
                                                let a = requestDto;
                                                requestDto.startDate = new Date(String(x));
                                                setRequestDto(a);
                                            }}
                                            type="date"
                                            value={requestDto.startDate.toString().split("T")[0]}
                                            defaultValue={requestDto.startDate.toString().split("T")[0]}
                                        />}
                                        {requestDto.endDate && <Input label="Ngày kết thúc" className={styles.input}
                                            handleChange={(_, x) => {
                                                let a = requestDto;
                                                requestDto.endDate = new Date(String(x));
                                                setRequestDto(a);
                                            }}
                                            type="date"
                                            value={requestDto.endDate.toString().split("T")[0]}
                                            defaultValue={requestDto.endDate.toString().split("T")[0]}
                                        />}
                                    </div>
                                </div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={requestDto.descriptions}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(_, editor) => {
                                        const data = editor.getData();
                                        handleInputChange("descriptions", data)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.title}>
                            <span>Thông tin huấn luyện viên</span>
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles['group-1']}>
                                <div className={styles.titleCommon}>
                                    <h2>HLV tạo giáo án</h2>
                                </div>
                                <Input
                                    label="Họ và tên"
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('packageName', String(value))}
                                    defaultValue={requestDto.packageCreator.lastName + " " + requestDto.packageCreator.firstName}
                                    value={requestDto.packageCreator.lastName + " " + requestDto.packageCreator.firstName}
                                    disabled
                                />
                                <Input
                                    label="Số điện thoại"
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('packageName', String(value))}
                                    defaultValue={requestDto.packageCreator.phone}
                                    disabled
                                />
                                <Input
                                    label='Giá'
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('packagePrice', String(value))}
                                    defaultValue={requestDto.packagePrice}
                                    value={requestDto.packagePrice}
                                    type='number'
                                />
                                <Input
                                    label="Loại"
                                    className={styles.input}
                                    handleChange={(_, value) => handleInputChange('type', String(value))}
                                    defaultValue={requestDto.type}
                                />
                            </div>
                            <div>
                                <div>
                                    <div className={styles['group-2']}>
                                        <div className={styles.flexCha}>
                                            <div className={styles.titleCommon}>
                                                <h2>Staff theo dõi</h2>
                                            </div>
                                            <Select
                                                className={styles.input}
                                                options={staffOptions}
                                                onChange={(value) => handleInputChange('packageFollowerId', Number(value))}
                                                defaultValue={requestDto.packageFollower?.id}
                                                value={requestDto.packageFollower?.id}
                                            />
                                        </div>
                                        <div className={styles.flexCha}>
                                            <div className={styles.titleCommon}>
                                                <h2>Huấn luyện viên dạy giáo án</h2>
                                            </div>
                                            <Select
                                                className={styles.input}
                                                options={trainerOptions}
                                                onChange={(value) => handleInputChange('packageTrainerId', Number(value))}
                                                defaultValue={requestDto.packageTrainer?.id}
                                                value={requestDto.packageTrainer?.id}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form}>
                        {/* Buoi tap */}
                        <Button
                            content={<span>Thêm buổi tập</span>}
                            className={styles.buttonSession}
                            onClick={handleAddSession}
                            loading={isLoading}
                        />
                        {requestDto.sessions.map((ses, sesIndex) => (ses.isActive === true &&
                            <div key={sesIndex} className={styles.newbox}>
                                <div className={styles.title}>
                                    <span>Thông tin buổi tập</span>
                                    <FontAwesomeIcon icon={faTrashCan} className={styles.delete} onClick={() => handleRemoveSesson(sesIndex)} />
                                </div>
                                <div className={styles.inputs}>
                                    <div className={styles['group-1']}>
                                        <Input
                                            label="Tiêu đề"
                                            className={styles.input}
                                            handleChange={(_, value) => handleTempSessionChange('title', String(value), sesIndex)}
                                            value={ses.title}
                                        />
                                        <Input
                                            label="Kết quả"
                                            className={styles.input}
                                            handleChange={(_, value) => handleTempSessionChange('outcome', String(value), sesIndex)}
                                            value={ses.outcome}
                                        />
                                        <Input
                                            label="Điểm năng lượng"
                                            className={styles.input}
                                            handleChange={(_, value) => handleTempSessionChange('energyPoint', String(value), sesIndex)}
                                            type='number'
                                            value={ses.energyPoint}
                                        />
                                        <Select
                                            className={styles.input}
                                            label="Cơ sở"
                                            options={options}
                                            onChange={(value) => {
                                                handleTempSessionChange('branchId', Number(value), sesIndex);
                                            }}
                                            value={requestDto?.sessions[sesIndex]?.branch?.id}
                                            defaultValue={requestDto?.sessions[sesIndex]?.branch?.id}
                                        />
                                        <Textarea
                                            label="Mô tả"
                                            className={styles.input}
                                            handleChange={(_, value) => handleTempSessionChange("descriptions", String(value), sesIndex)}
                                            value={ses.descriptions}
                                        />
                                    </div>
                                    <div className={styles['group-1']}>
                                        <div className={styles.title2}>
                                            Trạng thái
                                            <Select
                                                className={styles.input}
                                                options={sessonStatusOptions}
                                                onChange={(value) => {
                                                    handleTempSessionChange('isFinished', value, sesIndex);
                                                }}
                                                defaultValue={requestDto?.sessions[sesIndex]?.isFinished}
                                                value={requestDto?.sessions[sesIndex]?.isFinished}
                                            />
                                        </div>

                                        <div className={styles.title2}>
                                            Bài tập
                                            <Button
                                                content={<span>Thêm bài tập</span>}
                                                className={styles.buttonSession}
                                                onClick={() => addSessionItem(sesIndex)}
                                                loading={isLoading}
                                            />
                                        </div>
                                        {ses.sessionItems.map((sesItem, sesItemIndex) => (
                                            <div key={sesItemIndex} className={styles.cardSession}>
                                                <div className={styles.flexCha}>
                                                    <Input
                                                        className={styles.input}
                                                        handleChange={(_, value) => {
                                                            handleExerciseChange("title", String(value), sesIndex, sesItemIndex)
                                                        }}
                                                        label={"Tiêu đề"}
                                                        value={sesItem.title}
                                                    />
                                                    <FontAwesomeIcon icon={faTrashCan} className={styles.delete} onClick={() => handleRemoveSessonItem(sesIndex, sesItemIndex)} />
                                                </div>
                                                <div className={styles.flexCha}>
                                                    <Input
                                                        className={styles.input}
                                                        handleChange={(_, value) => {
                                                            handleExerciseChange("description", String(value), sesIndex, sesItemIndex)
                                                        }}
                                                        label={"Mô tả"}
                                                        value={sesItem.description}
                                                    />
                                                    <FontAwesomeIcon icon={faTrashCan} className={styles.hidden} onClick={() => handleRemoveSessonItem(sesIndex, sesItemIndex)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>))}
                        {/* {isOpenPopupSessionItem && 
                        <div className={styles.newbox2}>            
                            <div className={styles.title}>
                                <span>Bài tập</span>
                            </div>
                            <div className={styles.inputs}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt2pl-jBxZQRauAMdzkQD8xjIHpPnjPus5w&s" className={styles.avatar}></img>
                                <div className={styles['group-3']}>
                                        <Input
                                            label="Tiêu đề"
                                            className={styles.input}
                                            handleChange={(_, value) => handleSessionItemChange('title', String(value))}
                                            value={sessionItem.title}

                                        />
                                        <Textarea
                                            label="Mô tả"
                                            className={styles.input}
                                            handleChange={(_, value) => handleSessionItemChange('description', String(value))}
                                            value={sessionItem.description}
                                        />
                                                            <div className={styles.buttons}>
                                <div className={styles.group}>
                                    <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel, styles.buttonSession)} onClick={togglePopupSessionItem}/>
                                    <Button
                                        content={<span>Thêm</span>}
                                        className={styles.button}
                                        onClick={handleAddExercise(, sesIndex)}
                                        loading={isLoading}
                                    />
                                </div>
                                </div>
                                </div>
                            </div>
                    </div>} */}
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.group}>
                            <Button content={<span>Hủy</span>} className={clsx(styles.button, styles.cancel, styles.buttonSession)} onClick={handleCancelClick} />
                            <Button
                                content={<span>Lưu</span>}
                                className={styles.button}
                                onClick={handleUpdateClick}
                                loading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePackage;
