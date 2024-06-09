import clsx from 'clsx';

import Button from '@/components/Button';
import Input from '@/components/Input';

import styles from './create.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Select, { Option } from '@/components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CreateSellPackageRequestDto, Schedule } from '@/interfaces/Request/CreateSellPackageRequestDto';
import { executePostWithBody } from '@/utils/http-client';
import toast from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@mui/styles';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';


enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
const CreateSellPackage = () => {

    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>();
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
    let id = location.state.id;
    const [listSchedules, setListSchedules] = useState<Schedule[] >([]);
    const [scheduleItem, setScheduleItem] = useState<Schedule>({
        day: 0,
        time: {
            hour: 0,
            minute: 0
        }
    });
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
    
    const [requestDto, setRequestDto] = useState<CreateSellPackageRequestDto>({
        demoPackageId: id,
        consultee:{
            email: "",
            firstName: "",
            lastName: "", 
            phone: ""
        },
        endDate: new Date(),
        startDate: new Date(),
        schedules: listSchedules
    });

    const handleCreateClick = async () => {
        try {
            setIsLoading(true);
            const { data }: { data: BaseResponseDto<string> } = await executePostWithBody('/api/PackageConsultant', requestDto);
            if(data.hasError === false){
                toast.success('Tạo đơn hàng thành công');
                navigate('/consultant-package');
            }
            else {
                toast.error('Không thể tạo đơn hàng!');
            }
        } catch (error) {
            // toast.error('Không thể tạo đơn hàng!');
        } finally {
            setIsLoading(false);
            // navigate('/packages');
        }
    };
    const navigate = useNavigate();


    const handleCancelClick = () => {
        navigate('/consultant-package');
    };
    const handleAddSchedule = () => {
        const isObjectInList = listSchedules.some(item => item.day === scheduleItem.day && item.time === scheduleItem.time);
        if(isObjectInList == false){
            setListSchedules([...listSchedules, scheduleItem]);
        }
        let a = requestDto;
        requestDto.schedules = [...listSchedules, scheduleItem];
        setRequestDto(a);
    }
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
    const classes = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Đơn hàng</span>
            </div>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <Input
                            label="ID gói tập"
                            className={styles.input}
                            handleChange={() => {}}
                            defaultValue={id || ''}
                            disabled
                        />
                        <Input label="Ngày bắt đầu" className={styles.input} 
                            handleChange={(_, x)  => {
                                let a = requestDto;
                                requestDto.startDate = new Date(String(x));
                                setRequestDto(a);
                            }} 
                            type="date"/>
                        <Input label="Ngày kết thúc" className={styles.input} 
                            handleChange={(_, x) => {
                                let a = requestDto;
                                requestDto.endDate = new Date(String(x));
                                setRequestDto(a);
                            }} type="date"/>
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
                    <div className={styles['group-2']}>
                        <Input label="First name" className={styles.input} 
                            handleChange={(_, x) => {
                                let a = requestDto;
                                requestDto.consultee.firstName = String(x);
                                setRequestDto(a);
                            }} />
                        <Input label="Last name" className={styles.input} 
                            handleChange={(_, x) => {
                                let a = requestDto;
                                requestDto.consultee.lastName = String(x);
                                setRequestDto(a);
                            }} />
                        <Input label="Email" className={styles.input} 
                            handleChange={(_, x) => {
                                let a = requestDto;
                                requestDto.consultee.email = String(x);
                                setRequestDto(a);
                            }} />
                        <Input label="Phone" type='number' className={styles.input} 
                            handleChange={(_, x) => {
                                let a = requestDto;
                                requestDto.consultee.phone = String(x);
                                setRequestDto(a);
                            }} 
                            />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                        <div />
                        <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick}/>
                        <Button
                                content={<span>Tạo đơn hàng</span>}
                                className={styles.button}
                                onClick={handleCreateClick}
                                loading={isLoading}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSellPackage;