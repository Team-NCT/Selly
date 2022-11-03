import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { selectAlert } from "@/store/alertSlice";
import { Alert, Navbar } from "@/components";
import { Home, Counter, Test, Create, NFTDetail, Sell, Settings } from "@/pages";
import { useCheckLogined } from "@/hooks";
import { setAccount } from "@/store/loginSlice";
import { useEffect } from "react";

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const dispatch = useAppDispatch();

  const walletAccount = useCheckLogined();

  useEffect(() => {
    dispatch(setAccount(walletAccount));
  }, [walletAccount, dispatch]);

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

          {/* 테스트 페이지 */}
          <Route path="/counter" element={<Counter />} />
          <Route path="/test" element={<Test />} />
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
