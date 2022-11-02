import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAlert } from "@/store/alertSlice";
import { Alert, Navbar } from "@/components";
<<<<<<< HEAD
import { Home, Counter, Test, Create } from "@/pages";
=======
import { Home, Counter, Test, NFTDetail } from "@/pages";
>>>>>>> cb8522aab2c44a1b1bd3f8ecd865ffbd60856e1d

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          {/* Create 페이지 */}
          <Route path="/create" element={<Create />} />
=======
          {/* NFT 상세 페이지 */}
          <Route path="/detail/:id" element={<NFTDetail />} />

>>>>>>> cb8522aab2c44a1b1bd3f8ecd865ffbd60856e1d
          {/* 테스트 페이지 */}
          <Route path="/counter" element={<Counter />} />
          <Route path="/test" element={<Test />} />
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
