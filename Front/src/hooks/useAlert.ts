import { useAppDispatch } from "./useStore";

import {
  closeAlert,
  openAlert,
  setAlertContent,
  resetAlertContent,
  setAlertStyles,
  resetAlertStyles,
  setIconStyles,
  resetIconStyles,
} from "@/store/alertSlice";

import { AlertStylesType } from "@/components/common/Alert/Alert.types";

export interface OpenAlertArg {
  content: React.ReactNode;
  style: AlertStylesType;
  icon: boolean;
}

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const openAlertModal = ({ content, style, icon }: OpenAlertArg) => {
    dispatch(setAlertContent(content));
    dispatch(setAlertStyles(style));
    dispatch(setIconStyles(icon));
    dispatch(openAlert());
  };

  const closeAlertModal = () => {
    dispatch(closeAlert());
    dispatch(resetAlertContent());
    dispatch(resetAlertStyles());
    dispatch(resetIconStyles());
  };

  const openLoginAlert = () => {
    dispatch(setAlertContent("로그인 시, 이용할 수 있습니다."));
    dispatch(setAlertStyles("error"));
    dispatch(setIconStyles(true));
    dispatch(openAlert());
  };

  return { openAlertModal, closeAlertModal, openLoginAlert };
};
