import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { selectAlert } from "@/store/alertSlice";
import { Alert, Navbar } from "@/components/common";
import { Home, Create, NFTDetail, Sell, Settings, Profile } from "@/pages";
import { useCheckLogined } from "@/hooks";
import { setAccount } from "@/store/loginSlice";
import { useEffect } from "react";

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const dispatch = useAppDispatch();

  const accountData = useCheckLogined();

  useEffect(() => {
    dispatch(setAccount({ address: accountData.address, nickname: accountData.nickname }));
  }, [accountData, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* Create 페이지 */}
          <Route path="/create" element={<Create />} />
          {/* NFT 상세 페이지 */}
          <Route path="/detail/:id" element={<NFTDetail />} />
          {/* setting 페이지 */}
          <Route path="/settings" element={<Settings />} />
          {/* profile 페이지 */}
          <Route path="/profile" element={<Profile />} />
          {/* sell 페이지 */}
          <Route path="/Sell" element={<Sell />} />
        </Route>
      </Routes>

      {/* 알럿 포탈 */}
      {alertState &&
        createPortal(
          <Alert style={style} icon={icon}>
            {content}
          </Alert>,
          el
        )}
    </>
  );
}

export default App;
