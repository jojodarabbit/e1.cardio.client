export interface UpdateTaskRequestDto {
    taskName: string,
    taskInfomations: string,
    status: number,
    priority: number,
    receiverId: number
}

export interface CreateTaskRequestDto {
    taskName: string,
    taskInfomations: string,
    priority: number,
    receiverId: number
}

const PriorityEnum = {
    Low: 0,
    Medium: 1,
    High: 2
}

const StatusEnum = {
    ToDo: 0,
    InProcess: 1,
    Complete: 2
}
export default {PriorityEnum, StatusEnum};