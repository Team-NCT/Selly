import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

//* state의 타입
interface ModalState {
  test: boolean;
  property: boolean;
  buy: boolean;
  sell: boolean;
  sellStatus: boolean;
  confirm: boolean;
  follower: boolean;
  following: boolean;
  loading: boolean;
}

const initialState: ModalState = {
  test: false,
  property: false,
  buy: false,
  sell: false,
  sellStatus: false,
  confirm: false,
  follower: false,
  following: false,
  loading: false,
};

const slice = createSlice({
  name: "modal",
  initialState,

  reducers: {
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

    openConfirm: (state) => {
      state.confirm = true;
    },

    closeConfirm: (state) => {
      state.confirm = false;
    },

    openFollower: (state) => {
      state.follower = true;
    },

    openFollowing: (state) => {
      state.following = true;
    },

    closeFollow: (state) => {
      state.follower = false;
      state.following = false;
    },

    closeLoading: (state) => {
      state.loading = false;
    },

    openLoading: (state) => {
      state.loading = true;
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
  closeProperty,
  openProperty,
  closeBuy,
  openBuy,
  closeSell,
  openSell,
  closeSellStatus,
  openSellStatus,
  openConfirm,
  closeConfirm,
  openFollower,
  openFollowing,
  closeFollow,
  closeLoading,
  openLoading,
} = slice.actions;

export default slice.reducer;
