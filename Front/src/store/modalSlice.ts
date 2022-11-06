import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

//* state의 타입
interface ModalState {
  test: boolean;
  property: boolean;
  buy: boolean;
  sell: boolean;
  sellStatus: boolean;
}

const initialState: ModalState = {
  test: false,
  property: false,
  buy: false,
  sell: false,
  sellStatus: false,
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

    closeProperty: (state) => {
      state.property = false;
    },

    openProperty: (state) => {
      state.property = true;
    },

    closeBuy: (state) => {
      state.buy = false;
    },

    openBuy: (state) => {
      state.buy = true;
    },

    closeSell: (state) => {
      state.sell = false;
    },

    openSell: (state) => {
      state.sell = true;
    },

    closeSellStatus: (state) => {
      state.sellStatus = false;
    },

    openSellStatus: (state) => {
      state.sellStatus = true;
    },
  },
});

export const selectModal = createSelector(
  //* 입력 셀렉터
  (state: RootState) => state.modal,

  //* 출력 셀렉터
  (modal) => modal
);

export const {
  closeTest,
  openTest,
  closeProperty,
  openProperty,
  closeBuy,
  openBuy,
  closeSell,
  openSell,
  closeSellStatus,
  openSellStatus,
} = slice.actions;

export default slice.reducer;
