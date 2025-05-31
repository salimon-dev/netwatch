import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.tsx";
import { store } from "./Store/store.ts";
import { Provider } from "jotai";
import { BrowserRouter } from "react-router-dom";
import { loadAuth } from "./Store/auth.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "./Components/Notification.tsx";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

loadAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>
);
