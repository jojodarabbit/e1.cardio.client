import clsx from 'clsx';

import Button from '@/components/Button';
import Input from '@/components/Input';

import styles from './edit.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Select, { Option } from '@/components/Select';
import { useState } from 'react';
import { Schedule } from '@/interfaces/Request/CreateSellPackageRequestDto';
import { executeGetWithPagination,executePutWithBody} from '@/utils/http-client';
import toast from 'react-hot-toast';
import { BaseResponseDto } from '@/interfaces/Response/BaseResponseDto';
import { useAsync } from 'react-use';
import { SelledPackageResponseDto } from '@/interfaces/Response/SelledPackageResponseDto';
import { DemoPackageResponseDto } from '@/interfaces/Response/DemoPackageResponseDto';
import Textarea from '@/components/Textarea';
import { formatNumber } from '@/utils/common';
import { faDeleteLeft, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker} from '@mui/x-date-pickers/TimePicker';
import { makeStyles } from '@mui/styles';


enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
const EditSellPackage = () => {


    const location = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>();
    let id = location.state.id;

    const useStyles = makeStyles(() => ({
        timePicker: {
          '& .MuiInputBase-root': {
            'height': '45px', // Adjust the height as needed
            'overflow': 'hidden',
            'margin-bottom': '12px',
            'width': '200px',
            'border': '1px solid black',
            'background-color': 'white',
            'border-radius': '10px',
          },
        },
      }));
    const { value } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<SelledPackageResponseDto> } = await executeGetWithPagination(
                `/api/PackageConsultant/${id}`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });
    const [demoPackageId, setDemoPackageId] = useState<number>(location.state.demoPackageId);
    const [startDate, setStartDate] = useState<Date>(value?.startDate || new Date());
    const [endDate, setEndDate] = useState<Date>(value?.endDate || new Date());
    const [listSchedules, setListSchedules] = useState<Schedule[]>(location.state.schedules || []);
    const [scheduleItem, setScheduleItem] = useState<Schedule>({
        day: 0,
        time: {
            hour: 0,
            minute: 0
        }
    });
    const [isReceived] = useState<boolean>(false);

    const { value: allDemoPackage } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<DemoPackageResponseDto[]> } = await executeGetWithPagination(
                `/api/DemoPackage`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    });
    const demoPackageOptions: Option[] = allDemoPackage ? allDemoPackage.map((demoPackage) => 
        ({ label: demoPackage.packageName, value: demoPackage.id })) : [];


    const { value: demopackage } = useAsync(async () => {
        try {
            const { data }: { data: BaseResponseDto<DemoPackageResponseDto> } = await executeGetWithPagination(
                `/api/DemoPackage/${demoPackageId}`,
                { pageIndex: 1, pageSize: 1000000 },
            );
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }, [demoPackageId]);

    

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

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/consultant-package');
    };
    const handleAddSchedule = () => {
        const isObjectInList = listSchedules.some(item => item.day === scheduleItem.day && item.time === scheduleItem.time);
        if(isObjectInList == false){
            setListSchedules([...listSchedules, scheduleItem]);
        }
    }
    const handleRemoveSchedule = (day: number, time: {
        hour: number,
        minute: number
    }) => {
        let i = 0;
        listSchedules.forEach(element => {
            if(element.day === day && element.time === time){
                let listSchedule : Schedule[] = listSchedules;
                listSchedule.splice(i, 1);
                setListSchedules([...listSchedule])
            }
            i++;
        });
    }

    const handleUpdateClick= async () => {
        try {
            setIsLoading(true);

            const { data }: { data: BaseResponseDto<string> } = await executePutWithBody(`/api/PackageConsultant/${location.state.id}`, {
                "demoPackageId": demoPackageId,
                "startDate": startDate,
                "endDate": endDate,
                "schedules": listSchedules,
                "isReceived": isReceived,
            });
            if(data.hasError === false){
                toast.success('Cập nhật đơn hàng thành công');
                navigate('/consultant-package');
            }
            else{
                toast.error('Cập nhật đơn hàng thất bại!');
            }
        } catch (error) {
            // toast.error('Không thể cập nhật đơn hàng!');
        } finally {
            setIsLoading(false);
        }
    }
  const classes = useStyles();

    // const handleCreateClick = async () => {
    //     try {
    //         setIsLoading(true);
    //         await executePostWithBody('/api/SelledPackage', requestDto);
    //         toast.success('Tạo đơn hàng thành công');
    //     } catch (error) {
    //         toast.error('Không thể tạo đơn hàng!');
    //     } finally {
    //         setIsLoading(false);
    //         navigate('/packages');
    //     }
    // };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Đơn hàng</span>
            </div>
            {value && <div className={styles.form}>
            {/* Khach Hang */}
            {value.consultees && <div>             
            <div className={styles.card}>
                <div className={styles.title}>
                    <span>Khách hàng</span>
                </div>  
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Họ và tên"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultees.lastName + " " + value.consultees.firstName}
                                disabled
                            />
                            <Input
                                label="Số điện thoại"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultees?.phone}
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
                                    handleChange={() => {}}
                                    value={value.consultees?.email}
                                    disabled
                                />
                        </div>
                    </div>
                 </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                    <div />
                    </div>
                </div>
            </div>}
            {/* Nhân viên */}
            {value.consultants && <div>
            <div className={styles.card}>
                <div className={styles.title}>
                    <span>Nhân viên</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Họ và tên"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultants.lastName + " " + value.consultants.firstName}
                                disabled
                            />
                            <Input
                                label="Số điện thoại"
                                className={styles.input}
                                handleChange={() => {}}
                                value={value.consultants.phone}
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
                                handleChange={() => {}}
                                value={value.consultants.email}
                                disabled
                            />
                        </div>
                    </div>
                 </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                    <div />
                    </div>
                </div>
            </div>}
            {/* Gói tập */}
            {demopackage && <div>
            <div className={styles.cardbig}>
                <div className={styles.title}>
                    <span>Gói tập</span>
                    {allDemoPackage && <Select
                        className={styles.input}
                        options={demoPackageOptions}
                        onChange={(value) => {setDemoPackageId(+value)}} 
                        defaultValue={value.demoPackage.id} />}
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Tên gói tập"
                                className={styles.input}
                                handleChange={() => {}}
                                value={demopackage.packageName}
                                disabled
                            />
                            <Textarea
                                label="Mô tả"
                                className={styles.input}
                                handleChange={() => {}}
                                value={demopackage.descriptions}
                                disabled
                            />
                            <div className={styles.flexbox}>
                                <Input
                                    label="Số ngày"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={demopackage.numberOfDays}
                                    disabled
                                />
                                <Input
                                    label="Số buổi"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={demopackage.numberOfSessions}
                                    disabled
                                />
                                <Input
                                    label="Loại"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={demopackage.type}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.flexbox}>
                                <Input
                                    label="Giá tiền"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={formatNumber(demopackage.packagePrice as number)}
                                    disabled
                                />
                                <Input
                                    label="Số điện thoại"
                                    className={styles.input}
                                    handleChange={() => {}}
                                    value={demopackage.branch.phone}
                                    disabled
                                />
                            </div>
                            <Input
                                label="Tên chi nhánh"
                                className={styles.input}
                                handleChange={() => {}}
                                value={demopackage.branch.branchName}
                                title={demopackage.branch.branchName}
                                disabled
                            />
                            <Input
                                label="Vị trí chi nhánh"
                                className={styles.input}
                                handleChange={() => {}}
                                value={demopackage.branch.location}
                                title={demopackage.branch.location}
                                disabled
                            />
                        </div>
                    </div>
                 </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.group}>
                    <div />
                    </div>
                </div>
            </div> }
            {/* Thông tin khác*/}
            <div>
            <div className={styles.card}>
                <div className={styles.title}>
                    <span>Thông tin khác</span>
                </div>
                <div className={styles.inputs}>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <Input
                                label="Ngày bắt đầu"
                                className={styles.input}
                                handleChange={(_, value) => {setStartDate(new Date(value as string))}}
                                type="date"
                                defaultValue={startDate.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }).split('/').reverse().join('-') || ""}
                            />
                            <Input
                                label="Ngày kết thúc"
                                className={styles.input}
                                handleChange={(_, value) => {setEndDate(new Date(value as string))}}
                                type="date"
                                defaultValue={endDate.toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }).split('/').reverse().join('-')}
                            />
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.label}>Lịch tập</div>
                            {/* <div className={styles.flexbox}>  */}
                            <div className={styles.cardSchedule}>
                                {listSchedules.map((schedule, index) => (
                                    <div key={index} className={styles.scheduleRow}>
                                        {DaysOfWeek[schedule.day]} - {schedule.time.hour < 10 ? "0"+ schedule.time.hour: schedule.time.hour}:{schedule.time.minute < 10 ? "0"+ schedule.time.minute: schedule.time.minute}
                                        <FontAwesomeIcon icon={faDeleteLeft}  className={styles.iconRemove} onClick={() => handleRemoveSchedule(schedule.day, schedule.time)}/>
                                    </div>
                                ))}
                                
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className={styles['group-1']}>
                        <div className={styles.tools}>
                            {/* <div className={styles.tools}> Khách hàng </div> */}
                        </div>                        
                        <div className={styles.flexbox}>
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
                    </div>    
                 </div>
                </div>
                <div className={styles.buttons}>
                        <div className={styles.group}>
                            <div/>
                            <Button content={<span>Trở về</span>} className={clsx(styles.button, styles.cancel)} onClick={handleCancelClick}/>
                            <Button
                                content={<span>Cập nhật đơn hàng</span>}
                                className={styles.button}
                                onClick={handleUpdateClick}
                                loading={isLoading}
                            />
                        </div>
                    </div>
            </div>
            </div>}
        </div>
    );
};

export default EditSellPackage;