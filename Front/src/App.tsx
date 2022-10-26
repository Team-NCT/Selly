import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Counter } from "@/pages";

function App() {
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Home />} />

        {/* 테스트 페이지 */}
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </>
  );
}

export default App;
