import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface DashBoardStatistics {
  maleCount: number;
  femaleCount: number;
  hightMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  name: string;
  rankingList: Student[];
}

export interface DashBoardState {
  loading: boolean;
  statistics: DashBoardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashBoardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashBoardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

//Action
export const dashboardAction = dashboardSlice.actions;

//Selection
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
