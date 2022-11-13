//* NFT 조각 구매시, 관련 정보를 저장하는 store

import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface FractionState {
  sellerId: number;
  saleContractAddress: string;
  pieceCnt: number;
  tradePrice: number;
}

const initialState: FractionState = {
  sellerId: 0,
  saleContractAddress: "",
  pieceCnt: 0,
  tradePrice: 0,
};

const slice = createSlice({
  name: "fraction",
  initialState,

  reducers: {
    setFractionSaleData: (state, action: PayloadAction<FractionState>) => {
      state.sellerId = action.payload.sellerId;
      state.saleContractAddress = action.payload.saleContractAddress;
      state.pieceCnt = action.payload.pieceCnt;
      state.tradePrice = action.payload.tradePrice;
    },
    resetFractionSaleData: (state) => {
      state.sellerId = 0;
      state.saleContractAddress = "";
      state.pieceCnt = 0;
      state.tradePrice = 0;
    },
  },
});

export const selectFraction = createSelector(
  (state: RootState) => state.fraction,

  (fraction) => fraction
);

export const { setFractionSaleData, resetFractionSaleData } = slice.actions;
export default slice.reducer;
