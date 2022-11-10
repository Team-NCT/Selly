import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface AccountState {
  account: {
    address: string | null;
    userId: string | null | undefined;
    token: string | null | undefined;
  };
}

const initialState: AccountState = {
  account: { address: null, userId: null, token: null },
};

const slice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccount: (
      state,
      action: PayloadAction<{
        token: string | null | undefined;
        userId: string | null | undefined;
      }>
    ) => {
      state.account.userId = action.payload.userId;
      state.account.token = action.payload.token;
    },
    setAddress: (state, action: PayloadAction<{ address: string | null }>) => {
      state.account.address = action.payload.address;
    },
    logout: (state) => {
      state.account.userId = null;
      state.account.token = null;
      state.account.address = null;
    },
  },
});

export const selectAccount = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.account,

  // 출력 셀렉터
  (account) => account
);

export const { setAccount, setAddress, logout } = slice.actions;
export default slice.reducer;
