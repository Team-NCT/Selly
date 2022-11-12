import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface SelectNFTState {
  CA: string;
  tokenId: string;
  metaDataUrl: string;
  articleName: string;
  articleUrl: string;
  selectIdx: number;
}

const initialState: SelectNFTState = {
  CA: "",
  tokenId: "",
  metaDataUrl: "",
  articleName: "",
  articleUrl: "",
  selectIdx: -1,
};

const slice = createSlice({
  name: "selectNFT",
  initialState,

  reducers: {
    setNFTValue: (state, action: PayloadAction<SelectNFTState>) => {
      state.CA = action.payload.CA;
      state.tokenId = action.payload.tokenId;
      state.metaDataUrl = action.payload.metaDataUrl;
      state.articleName = action.payload.articleName;
      state.articleUrl = action.payload.articleUrl;
      state.selectIdx = action.payload.selectIdx;
    },
    resetNFTValue: (state) => {
      state.CA = "";
      state.tokenId = "";
      state.metaDataUrl = "";
      state.articleName = "";
      state.articleUrl = "";
      state.selectIdx = -1;
    },
  },
});

export const selectNFTValue = createSelector(
  (state: RootState) => state.NFTValue,

  (NFTValue) => NFTValue
);

export const { setNFTValue, resetNFTValue } = slice.actions;
export default slice.reducer;
