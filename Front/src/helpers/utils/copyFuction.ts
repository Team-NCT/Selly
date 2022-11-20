import { OpenAlertArg } from "@/hooks";

export const copyAlertData = (address: string) => {
  try {
    navigator.clipboard.writeText(address);
    const data: OpenAlertArg = {
      content: "복사 되었습니다.",
      style: "success",
      icon: true,
    };
    return data;
  } catch (error) {
    const data: OpenAlertArg = {
      content: "복사 실패했습니다.",
      style: "error",
      icon: true,
    };
    return data;
  }
};
