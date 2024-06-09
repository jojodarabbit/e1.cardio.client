import { DashboardResponseDto } from '@/interfaces/Response/DashboardResponseDto';

export const dashboardOverview: DashboardResponseDto = {
    member: { stat: 10948, growthNumber: -8.5 },
    trainer: { stat: 10948, growthNumber: 8.5 },
    staff: { stat: 9999, growthNumber: -8.5 },
    program: { stat: 2048, growthNumber: 8.5 },
};
