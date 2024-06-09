import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

import Button from '@/components/Button';
import { TrainingPrograms } from '@/components/Icons';
import Input from '@/components/Input';
import Loader from '@/components/Loading/Loader';
import Select, { Option } from '@/components/Select';
import { CreatePackageRequestDto } from '@/interfaces/Response/LessonPlanResponseDto';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { BranchResponseDto } from '@/interfaces/Response/BranchResponseDto';
import { executeGetWithPagination, executePostWithBody } from '@/utils/http-client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './create.module.scss';
import { useNavigate } from 'react-router-dom';
import { Schedule, session, sessionItems } from '@/interfaces/Response/LessonPlanResponseDto';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faDeleteLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Textarea from '@/components/Textarea';
const CreatePackage = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listSchedules, setListSchedules] = useState<Schedule[] >([]);
    const [listSession, setListSession] = useState<session[]>([]);
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
    const [requestDto, setRequestDto] = useState<CreatePackageRequestDto>({
        branchId: 0,
        descriptions: '',
        numberOfDays: 0,
        numberOfSessions: 0,
        packageName: '',
        endDate: new Date(),
        imageUrl: '',
        schedules: listSchedules,
        sessions: listSession as session[],
        startDate: new Date(),
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
        {number: 0, date: "Sunday"},
        {number: 1, date: "Monday"},
        {number: 2, date: "Tuesday"},
        {number: 3, date: "Wednesday"},
        {number: 4, date: "Thursday"},
        {number: 5, date: "Friday"},
        {number: 6, date: "Saturday"},
    ]

    const daysInWeekOptions: Option[] = daysInWeek ? daysInWeek.map((branch) => ({ label: branch.date, value: branch.number })) : [];

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
                endDate: requestDto?.endDate,
                imageUrl: requestDto?.imageUrl,
                schedules: requestDto?.schedules,
                sessions: requestDto?.sessions,
                startDate: requestDto?.startDate

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
            const { data }: { data: BaseResponseDto<string> } = await executePostWithBody('/api/Package', requestDto);
            if(data.hasError === false ){
                toast.success('Tạo giáo án thành công');
                navigate('/lessonPlan');
            }
            else{
                toast.error('Tạo giáo án thất bại');
            }
            // console.log(requestDto);
            // console.log(listSession)
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
        console.log({day, time});
        let i = 0;
        listSchedules.forEach(element => {
            if(element.day === day && element.time === time){
                let listSchedule : Schedule[] = listSchedules;
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
        let a = listSession;
        a[sesIndex].sessionItems = a[sesIndex].sessionItems.filter(x => x !== a[sesIndex].sessionItems[sesItemIndex]);
        setListSession(a);
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })
    }

    const handleRemoveSesson = (sesIndex: number) => {
        let a = listSession;
        a = a.filter(x => x !== a[sesIndex]);
        setListSession(a);
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })
    }
    const handleAddSchedule = () => {
            const isObjectInList = listSchedules.some(item => item.day === scheduleItem.day && item.time === scheduleItem.time);
            if(isObjectInList == false){
                setListSchedules([...listSchedules, scheduleItem]);
            }
            let a = requestDto;
            requestDto.schedules = [...listSchedules, scheduleItem];
            setRequestDto(a);
    }
    const handleExerciseChange = (key: keyof sessionItems, value: string | number, sesIndex: number, sesItemIndex: number) => {
        setSessionTemp((prev) => ({ ...prev, [key]: value }));
        let a = listSession;
        if(key ==="title"){
            a[sesIndex].sessionItems[sesItemIndex].title = value as string
        }
        else if(key ==="description"){
            a[sesIndex].sessionItems[sesItemIndex].description = value as string
        }
        setListSession(a)
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })

    }
    const handleTempSessionChange = (key: keyof session, value: string | number, sesIndex: number) => {
        setSessionTemp((prev) => ({ ...prev, [key]: value }));

        let a = listSession;
        if(key ==="title"){
            a[sesIndex].title = value as string
        }
        else if(key ==="descriptions"){
            a[sesIndex].descriptions = value as string
        }
        else if(key ==="energyPoint"){
            a[sesIndex].energyPoint = value as number
        }
        else if(key ==="outcome"){
            a[sesIndex].outcome = value as string
        }
        setListSession(a)
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })
        console.log(a);
    };
    const handleAddSession = () => {
        setListSession([...listSession, {
            descriptions: '',
            energyPoint: 0,
            outcome: '',
            sessionItems: [],
            title: ''
        }])
        console.log(listSession)
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })
    }
    const addSessionItem = (index: number) => {

        let a = listSession;
        a[index].sessionItems.push({
            description: '',
            imageUrl: '',
            title: ''
        });
        setListSession(a);
        // setListSession([...listSession])    
        setRequestDto({
            ...requestDto,
            sessions: listSession
        })    
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <TrainingPrograms />
                <span>Giáo án</span>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                <div className={styles.form}>
                    <div className={styles.title}>
                            <span>Thông tin cơ bản</span>
                        </div>
                    <div className={styles.inputs}>
                        <div className={styles['group-1']}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt2pl-jBxZQRauAMdzkQD8xjIHpPnjPus5w&s" className={styles.avatar} id='profile-pic'></img>
                            <Input
                                label="Tên giáo án"
                                className={styles.input}
                                handleChange={(_, value) => handleInputChange('packageName', String(value))}
                            />
                            <Select
                                    className={styles.input}
                                    label="Cơ sở"
                                    options={options}
                                    onChange={(value) => handleInputChange('branchId', Number(value))} defaultValue={0}                            />

                            <div className={styles.timeSelect}>
                            <Select
                                    className={styles.input}
                                    label="Thời gian tập"
                                    options={daysInWeekOptions}
                                    onChange={(value) => {
                                        setScheduleItem({day : +value, time : scheduleItem.time})
                                    }}
                                    defaultValue= {scheduleItem.day}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker 
                                        className={classes.timePicker}
                                        onChange={(value) => {
                                        setScheduleItem({day : scheduleItem.day, time : {
                                            hour: value?.hour() as number,
                                            minute: value?.minute() as number
                                        }})
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FontAwesomeIcon icon={faSquarePlus}  className={styles.icon} onClick={handleAddSchedule}/>
                        </div>
                            <div className={styles.scheduleContainer}>
                                {listSchedules.map((schedule, index) => (
                                    <div key={index} className={styles.schedule}>
                                            {DaysOfWeek[schedule.day]} - {schedule.time.hour < 10 ? "0"+ schedule.time.hour: schedule.time.hour}:{schedule.time.minute < 10 ? "0"+ schedule.time.minute: schedule.time.minute}
                                            <FontAwesomeIcon icon={faDeleteLeft}  className={styles.iconRemove} onClick={() => handleRemoveSchedule(schedule.day, schedule.time)}/>
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
                                    <Input
                                        label="Số buổi"
                                        className={styles.input}
                                        fixedplaceholder="buổi"
                                        handleChange={(_, value) => handleInputChange('numberOfSessions', String(value))}
                                        type="number"
                                    />
                                </div>
                                <div className={styles['group-2']}>
                                    {/* <Input
                                        label="Loại gói tập"
                                        className={styles.input}
                                        handleChange={(_, value) => handleInputChange('type', String(value))}
                                    /> */}
                                    <Input
                                        label="Số ngày dự kiến hoàn thành"
                                        className={styles.input}
                                        fixedplaceholder="ngày"
                                        handleChange={(_, value) => handleInputChange('numberOfDays', String(value))}
                                        type="number"
                                    />
                                </div>
                                <div className={styles['group-2']}>
                                    <Input label="Ngày bắt đầu" className={styles.input}
                                        handleChange={(_, x)  => {
                                        let a = requestDto;
                                        requestDto.startDate = new Date(String(x));
                                        setRequestDto(a);
                                    }} 
                                    type="date"
                                    />
                                    <Input label="Ngày kết thúc" className={styles.input} 
                                        handleChange={(_, x) => {
                                            let a = requestDto;
                                            requestDto.endDate = new Date(String(x));
                                            setRequestDto(a);
                                        }} type="date"/>
                                </div>
                            </div>
                            <CKEditor
                            editor={ ClassicEditor }
                            data={requestDto.descriptions}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ (_, editor ) => {
                                const data = editor.getData();
                                handleInputChange("descriptions",data)
                            } }
                            />
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
                    {listSession.map((ses, sesIndex) => (
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
                                    <Textarea
                                            label="Mô tả"
                                            className={styles.input}
                                            handleChange={(_, value) => handleTempSessionChange("descriptions", String(value), sesIndex)}
                                            value={ses.descriptions}
                                        />
                            </div>
                            <div className={styles['group-1']}>
                                <Button
                                    content={<span>+</span>}
                                    className={styles.buttonSession}
                                    onClick={() => addSessionItem(sesIndex)}
                                    loading={isLoading}
                                />
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
                                                    <FontAwesomeIcon icon={faTrashCan} className={styles.delete} onClick={() => handleRemoveSessonItem(sesIndex,sesItemIndex)} />
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
                                                    <FontAwesomeIcon icon={faTrashCan} className={styles.hidden} onClick={() => handleRemoveSessonItem(sesIndex,sesItemIndex)} />
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
                            <Button content={<span>Hủy</span>} className={clsx(styles.button, styles.cancel, styles.buttonSession)} onClick={handleCancelClick}/>
                            <Button
                                content={<span>Lưu</span>}
                                className={styles.button}
                                onClick={handleCreateClick}
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
