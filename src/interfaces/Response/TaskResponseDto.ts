export interface TaskResponseDto {
    id: number,
    taskName: string,
    taskInfomations: string,
    assigners: {
      id: number,
      phone: number,
      firstName: string,
      lastName: string,
      email: string,
      address: string
    },
    receivers: {
      id: number,
      phone: number,
      firstName: string,
      lastName: string,
      email: string,
      address: string
    },
    priority: string,
    status: string,
    createdDate: Date,
    updatedDate: Date
}
