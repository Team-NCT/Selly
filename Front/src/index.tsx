import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const reactDomRoot = createRoot(document.getElementById("root"));
reactDomRoot.render(createElement(StrictMode, null, createElement(App)));
