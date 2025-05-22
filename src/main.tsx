import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.tsx";
import { store } from "./Store/store.ts";
import { Provider } from "jotai";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
