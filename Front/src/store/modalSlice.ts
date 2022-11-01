import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

//* state의 타입
interface ModalState {
  test: boolean;
}

const initialState: ModalState = {
  test: false,
};

const slice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    closeTest: (state) => {
      state.test = false;
    },

    openTest: (state) => {
      state.test = true;
    },
  },
});

export const selectModal = createSelector(
  //* 입력 셀렉터
  (state: RootState) => state.modal,

  //* 출력 셀렉터
  (modal) => modal
);

export const { closeTest, openTest } = slice.actions;

export default slice.reducer;
