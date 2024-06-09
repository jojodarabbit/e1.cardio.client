import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DashboardResponseDto } from '@/interfaces/Response/DashboardResponseDto';
import { DashboardStatePayload } from '@/interfaces/StateManagement/DashboardStatePayload';

import { RootState } from '../store';

interface ProjectDetailSlice {
    overview: DashboardResponseDto | null;
}

const initState: ProjectDetailSlice = {
    overview: null,
};

export const dashboard = createSlice({
    name: 'dashboard',
    initialState: initState,
    reducers: {
        updateOverviewData(state: ProjectDetailSlice, action: PayloadAction<Pick<DashboardStatePayload, 'overview'>>) {
            state.overview = action.payload.overview;
        },
    },
});

export const { updateOverviewData } = dashboard.actions;
export const selectDashboardData = (state: RootState) => {
    return state.dashboard;
};
export default dashboard.reducer;
