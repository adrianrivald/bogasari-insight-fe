import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { withAuth } from "./sections/auth/hocs/auth.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./sections/auth/providers/auth.tsx";
import { queryClient } from "./utils/query-client.ts";
import { AppLayout } from "./layouts/layout.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppWithAuth = withAuth(App);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <React.Suspense>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <AppLayout>
                  <App />
                  <ToastContainer hideProgressBar closeOnClick draggable />
                </AppLayout>
              </AuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </React.Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
