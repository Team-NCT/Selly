import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface AccountState {
  account: string | null;
}

const initialState: AccountState = {
  account: null,
};

const slice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
  },
});

export const selectAccount = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.account,

  // 출력 셀렉터
  (account) => account
);

export const { setAccount } = slice.actions;
export default slice.reducer;
