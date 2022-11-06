import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface ProfleStatusState {
  profleStatus: boolean;
}

const initialState: ProfleStatusState = {
  profleStatus: false,
};

const slice = createSlice({
  name: "profleStatus",
  initialState,

  reducers: {
    setProfleStatus: (state, action: PayloadAction<boolean>) => {
      state.profleStatus = action.payload;
    },
  },
});

export const selectProfleStatus = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.profleStatus,

  // 출력 셀렉터
  (profleStatus) => profleStatus
);

export const { setProfleStatus } = slice.actions;
export default slice.reducer;
