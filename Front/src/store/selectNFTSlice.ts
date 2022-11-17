import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface SelectNFTState {
  CA: string;
  tokenId: string;
  metaDataUrl: string;
  articleName: string;
  articleImgUrl: string;
  selectIdx: number;
}

const initialState: SelectNFTState = {
  CA: "",
  tokenId: "",
  metaDataUrl: "",
  articleName: "",
  articleImgUrl: "",
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
      state.articleImgUrl = action.payload.articleImgUrl;
      state.selectIdx = action.payload.selectIdx;
    },
    resetNFTValue: (state) => {
      state.CA = "";
      state.tokenId = "";
      state.metaDataUrl = "";
      state.articleName = "";
      state.articleImgUrl = "";
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
