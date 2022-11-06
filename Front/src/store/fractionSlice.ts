//* NFT 조각 구매시, 관련 정보를 저장하는 store

import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface FractionState {
  saleContract: string;
  count: number;
  price: number;
}

const initialState: FractionState = {
  saleContract: "",
  count: 0,
  price: 0,
};

const slice = createSlice({
  name: "fraction",
  initialState,

  reducers: {
    setFractionSaleData: (state, action: PayloadAction<FractionState>) => {
      state.saleContract = action.payload.saleContract;
      state.count = action.payload.count;
      state.price = action.payload.price;
    },
    resetFractionSaleData: (state) => {
      state.saleContract = "";
      state.count = 0;
      state.price = 0;
    },
  },
});

export const selectFraction = createSelector(
  (state: RootState) => state.fraction,

  (fraction) => fraction
);

export const { setFractionSaleData, resetFractionSaleData } = slice.actions;
export default slice.reducer;
