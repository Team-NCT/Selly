import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAlert } from "@/store/alertSlice";
import { Alert, Navbar } from "@/components/common";
import {
  Home,
  Create,
  NFTDetail,
  Sell,
  Settings,
  Profile,
  Explore,
  Category,
  SearchResult,
} from "@/pages";
import { useCheckLogined } from "@/hooks";

import { useEffect } from "react";

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const [checkWallet] = useCheckLogined();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        console.log("체인 바뀜");
        checkWallet();
      });
      window.ethereum.on("accountsChanged", () => {
        console.log("아이디 바뀜");
        checkWallet();
      });
    }
  });

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
          <Route path="/profile/:id" element={<Profile />} />
          {/* sell 페이지 */}
          <Route path="/Sell" element={<Sell />} />
          {/* Explore 페이지 */}
          <Route path="/explore" element={<Explore />} />
          {/* 카테고리 별 Explore 페이지 */}
          {/* all, analog, digital, photography */}
          <Route path="/explore/:category" element={<Category />} />
          <Route path="/search" element={<SearchResult />} />
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
