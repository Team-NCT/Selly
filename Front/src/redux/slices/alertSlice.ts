import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { AlertStylesType } from "@/components/common/Alert/Alert.types";
import { RootState } from "../store";

//* state의 타입
interface AlertState {
  //* 알럿 상태 (true: 알럿이 보이는 상태, false: 알럿이 보이지 않는 상태)
  status: boolean;

  //* 알럿 문구
  content: React.ReactNode;

  //* 알럿 스타일
  style?: AlertStylesType;

  //* 아이콘 스타일
  icon?: boolean;
}

const initialState: AlertState = {
  status: false,
  content: "",
  style: undefined,
  icon: undefined,
};

const slice = createSlice({
  name: "alert",
  initialState,

  reducers: {
    //* Alert on, off
    closeAlert: (state) => {
      state.status = false;
    },

    openAlert: (state) => {
      state.status = true;
    },

    //* Alert 문구 설정
    setAlertContent: (state, action: PayloadAction<React.ReactNode>) => {
      state.content = action.payload;
    },

    resetAlertContent: (state) => {
      state.content = "";
    },

    //* Alert 스타일 설정
    setAlertStyles: (state, action: PayloadAction<AlertStylesType>) => {
      state.style = action.payload;
    },
    resetAlertStyles: (state) => {
      state.style = undefined;
    },

    //* icon 스타일 설정
    setIconStyles: (state, action: PayloadAction<boolean>) => {
      state.icon = action.payload;
    },
    resetIconStyles: (state) => {
      state.icon = undefined;
    },
  },
});

export const selectAlert = createSelector(
  //* 입력 셀렉터
  (state: RootState) => state.alert,

  //* 출력 셀렉터
  (alert) => alert
);

export const {
  closeAlert,
  openAlert,
  setAlertContent,
  resetAlertContent,
  setAlertStyles,
  resetAlertStyles,
  setIconStyles,
  resetIconStyles,
} = slice.actions;

export default slice.reducer;
