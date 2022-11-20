//* NFT 판매 페이지에서 판매 정보를 저장하는 store

import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface SellInfoState {
  category: string;
  code: string;
  num: string;
  price: string;
}

const initialState: SellInfoState = {
  category: "Digital",
  code: "",
  num: "",
  price: "",
};

const slice = createSlice({
  name: "sellInfo",
  initialState,

  reducers: {
    setSellInfo: (state, action: PayloadAction<SellInfoState>) => {
      state.category = action.payload.category;
      state.code = action.payload.code;
      state.num = action.payload.num;
      state.price = action.payload.price;
    },
    resetSellInfo: (state) => {
      state.category = "Digital";
      state.code = "";
      state.num = "";
      state.price = "";
    },
  },
});

export const selectSellInfo = createSelector(
  (state: RootState) => state.sellInfo,

  (sellInfo) => sellInfo
);

export const { setSellInfo, resetSellInfo } = slice.actions;
export default slice.reducer;
