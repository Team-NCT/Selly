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
} from "@/redux/slices/alertSlice";

import { AlertStylesType } from "@/components/common/Alert/Alert.types";

export interface OpenAlertArg {
  content: React.ReactNode;
  style: AlertStylesType;
  icon: boolean;
}

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const openAlertModal = ({ content, style, icon }: OpenAlertArg) => {
    dispatch(openAlert());
    dispatch(setAlertContent(content));
    dispatch(setAlertStyles(style));
    dispatch(setIconStyles(icon));
  };

  const closeAlertModal = () => {
    dispatch(closeAlert());
    dispatch(resetAlertContent());
    dispatch(resetAlertStyles());
    dispatch(resetIconStyles());
  };

  return { openAlertModal, closeAlertModal };
};
