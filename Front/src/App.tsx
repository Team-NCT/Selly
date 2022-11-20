import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useStore";
import { selectAlert } from "@/store/alertSlice";
import { Alert, Navbar } from "@/components/common";
import { selectAccount } from "@/store/loginSlice";

import {
  Home,
  Create,
  NFTDetail,
  Settings,
  Sell,
  Profile,
  Explore,
  Category,
  SearchResult,
  NotFound,
} from "@/pages";

import { useCheckLogined, useSetGoerli } from "@/hooks";

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;

  const [checkWallet] = useCheckLogined();
  const [setGoerliToken] = useSetGoerli();
  const { userId } = useAppSelector(selectAccount);

  useEffect(() => {
    window.ethereum?.on("chainChanged", checkWallet);
    window.ethereum?.on("accountsChanged", checkWallet);
    if (window.ethereum && userId) {
      setGoerliToken();
    }

    return () => {
      window.ethereum?.removeListener("chainChanged", checkWallet);
      window.ethereum?.removeListener("accountsChanged", checkWallet);
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <Route path="/detail/:articleId" element={<NFTDetail />} />
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
          <Route path="*" element={<NotFound />} />
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
