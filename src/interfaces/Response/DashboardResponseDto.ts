export interface DashboardValueResponseDto {
    stat: number;
    growthNumber: number;
}

export interface DashboardResponseDto {
    member: DashboardValueResponseDto;
    trainer: DashboardValueResponseDto;
    staff: DashboardValueResponseDto;
    program: DashboardValueResponseDto;
}
