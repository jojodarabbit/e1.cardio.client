export interface Schedule {
    day: number;
    time: {
      hour: number,
      minute: number
    };
}
export interface CreateSellPackageRequestDto {
    demoPackageId: number,
    consultee: {
      phone: string,
      firstName: string,
      lastName: string,
      email: string
    },
    schedules: Schedule[],
    startDate: Date,
    endDate: Date
}