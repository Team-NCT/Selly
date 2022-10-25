import { createElement } from "react";

export default function App() {
  return createElement(
    "div",
    { className: "app" },
    createElement("h1", null, "안녕! React 😃")
  );
}
