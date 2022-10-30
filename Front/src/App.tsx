import "@/styles/base/_base.scss";
import { Route, Routes } from "react-router-dom";
import { Home, Counter, Test } from "@/pages";
import { useAppSelector } from "./hooks/useStore";
import { selectAlert } from "./redux/slices/alertSlice";
import { createPortal } from "react-dom";
import Alert from "./components/common/Alert/Alert";

function App() {
  const { status: alertState, content, style, icon } = useAppSelector(selectAlert);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const el = document.getElementById("modal-root")!;
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 테스트 페이지 */}
        <Route path="/counter" element={<Counter />} />
        <Route path="/test" element={<Test />} />
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
