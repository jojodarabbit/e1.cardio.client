import { combineReducers } from 'redux';

import dashboardSlice from './slices/dashboard';

const rootReducer = combineReducers({
    dashboard: dashboardSlice,
});

export default rootReducer;
