import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface AccountState {
  account: { nickname: string | null; address: string | null };
}

const initialState: AccountState = {
  account: { nickname: null, address: null },
};

const slice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccount: (
      state,
      action: PayloadAction<{ nickname: string | null; address: string | null }>
    ) => {
      state.account.address = action.payload.address;
      state.account.nickname = action.payload.nickname;
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
