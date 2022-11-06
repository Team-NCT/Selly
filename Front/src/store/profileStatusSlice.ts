import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface ProfleStatusState {
  profleStatus: { usernameStatus: boolean; bioStatus: boolean };
}

const initialState: ProfleStatusState = {
  profleStatus: { usernameStatus: false, bioStatus: false },
};

const slice = createSlice({
  name: "profleStatus",
  initialState,

  reducers: {
    setUsernameStatus: (state, action: PayloadAction<boolean>) => {
      state.profleStatus.usernameStatus = action.payload;
    },
    setBioStatus: (state, action: PayloadAction<boolean>) => {
      state.profleStatus.bioStatus = action.payload;
    },
  },
});

export const selectProfleStatus = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.profleStatus,

  // 출력 셀렉터
  (profleStatus) => profleStatus
);

export const { setUsernameStatus, setBioStatus } = slice.actions;
export default slice.reducer;
