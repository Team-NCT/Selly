import { useAppDispatch } from "@/hooks/useStore";
import { logout } from "@/store/loginSlice";
import { useNavigate } from "react-router-dom";

const useCheckLogined = () => {
  const dispatch = useAppDispatch();
  const goPage = useNavigate();

  //* 지갑 체크

  const checkWallet = async () => {
    dispatch(logout());
    goPage("/");
    console.log("ㅎㅇ");
  };

  return [checkWallet];
};

export default useCheckLogined;
