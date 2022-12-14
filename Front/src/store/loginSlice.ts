import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface AccountState {
  address: string | null;
  userId: number | null | undefined;
  token: string | null | undefined;
  goerliToken: number | null;
}

const initialState: AccountState = {
  address: null,
  userId: null,
  token: null,
  goerliToken: null,
};

const slice = createSlice({
  name: "account",
  initialState,

  reducers: {
    setAccount: (
      state,
      action: PayloadAction<{
        token: string | null | undefined;
        userId: number | null | undefined;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    setAddress: (state, action: PayloadAction<{ address: string | null }>) => {
      state.address = action.payload.address;
    },
    setGoerliToken: (state, action: PayloadAction<{ goerliToken: number | null }>) => {
      state.goerliToken = action.payload.goerliToken;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.address = null;
      state.goerliToken = null;
    },
  },
});

export const selectAccount = createSelector(
  // 입력 셀렉터
  (state: RootState) => state.account,

  // 출력 셀렉터
  (account) => account
);

export const { setAccount, setAddress, setGoerliToken, logout } = slice.actions;
export default slice.reducer;
