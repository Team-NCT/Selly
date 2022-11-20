import { getWallet, getGoerliToken } from "@/api/blockchain";
import { setGoerliToken } from "@/store/loginSlice";
import { useAppDispatch } from "@/hooks/useStore";

const useSetGoerli = () => {
  const dispatch = useAppDispatch();

  const setGoerli = async () => {
    const address = await getWallet();
    const goerliToken = await getGoerliToken(address);
    dispatch(
      setGoerliToken({
        goerliToken: goerliToken,
      })
    );
  };

  return [setGoerli];
};
export default useSetGoerli;
