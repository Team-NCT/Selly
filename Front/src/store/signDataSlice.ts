import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface signDataState {
  F_NFTCA: string;
  F_NFTSaleCA: string;
}

const initialState: signDataState = {
  F_NFTCA: "",
  F_NFTSaleCA: "",
};

const slice = createSlice({
  name: "signData",
  initialState,

  reducers: {
    setF_NFTCA: (state, action: PayloadAction<string>) => {
      state.F_NFTCA = action.payload;
    },
    setF_NFTSaleCA: (state, action: PayloadAction<string>) => {
      state.F_NFTSaleCA = action.payload;
    },
    resetSignData: (state) => {
      state.F_NFTCA = "";
      state.F_NFTSaleCA = "";
    },
  },
});

export const selectSignData = createSelector(
  (state: RootState) => state.signData,

  (signData) => signData
);

export const { setF_NFTCA, setF_NFTSaleCA, resetSignData } = slice.actions;
export default slice.reducer;
