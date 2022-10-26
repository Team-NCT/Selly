import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Counter } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
      </Routes>
    </>
  );
}

export default App;
