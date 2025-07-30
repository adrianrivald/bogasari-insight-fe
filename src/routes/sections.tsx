import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { varAlpha } from "../theme/styles";
import { useAuth } from "../sections/auth/providers/auth";
import { AppLayout } from "../layouts/layout";

// ----------------------------------------------------------------------
export const HomePage = lazy(() => import("../pages/home"));

// Authentication pages
export const SignInPage = lazy(() => import("../pages/auth/sign-in"));
export const SignUpPage = lazy(() => import("../pages/auth/sign-up"));
export const CheckEmailPage = lazy(() => import("../pages/auth/check-email"));
export const SuccessRegistrationPage = lazy(
  () => import("../pages/auth/success-registration")
);
export const ForgotPasswordPage = lazy(
  () => import("../pages/auth/forgot-password")
);

export const ResetPasswordPage = lazy(
  () => import("../pages/auth/reset-password")
);
export const CompleteProfilePage = lazy(
  () => import("../pages/auth/complete-profile")
);
export const DanaPensiunPage = lazy(() => import("../pages/dana-pensiun"));
export const PencairanDanaPensiunPage = lazy(
  () => import("../pages/pencairan-dana-pensiun")
);
export const SummaryPencairanDanaPensiunPage = lazy(
  () => import("../pages/pencairan-dana-pensiun/summary")
);
export const DetailPencairanDanaPage = lazy(
  () => import("../pages/pencairan-dana-pensiun/detail")
);

export const VerifyOtpPage = lazy(() => import("../pages/auth/verify-otp"));

export const DashboardHomePage = lazy(() => import("../pages/home/index"));

export const AuthCallbackPage = lazy(() => import("../pages/auth/callback"));

// ----------------------------------------------------------------------

export const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
    sx={{
      py: 24,
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export function Router() {
  const { isAuth } = useAuth();

  const authenticatedRoutes = useRoutes([
    {
      element: (
        // <Suspense fallback={renderFallback}>
        <Outlet />
        // </Suspense>
      ),
      children: [
        { path: "/", element: <DashboardHomePage />, index: true },

        {
          path: "/success-registration",
          element: <SuccessRegistrationPage />,
        },
        {
          path: "/complete-profile",
          element: <CompleteProfilePage />,
        },
        {
          path: "/dana-pensiun",
          element: <DanaPensiunPage />,
        },
        {
          path: "/pencairan-dana-pensiun",
          element: <PencairanDanaPensiunPage />,
        },
        {
          path: "/pencairan-dana-pensiun/summary",
          element: <SummaryPencairanDanaPensiunPage />,
        },
        {
          path: "/pencairan-dana-pensiun/detail",
          element: <DetailPencairanDanaPage />,
        },
        // {
        //   path: "*",
        //   element: <Navigate to="/404" replace />,
        // },
      ],
    },
  ]);

  const unAuthenticatedRoutes = useRoutes([
    {
      element: (
        <AppLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: [
        {
          path: "/",
          element: <SignInPage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/check-email",
          element: <CheckEmailPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "/reset-password",
          element: <ResetPasswordPage />,
        },
        {
          path: "/verify-otp",
          element: <VerifyOtpPage />,
        },
        {
          path: "/success-registration",
          element: <SuccessRegistrationPage />,
        },
        {
          path: "/auth/callback",
          element: <AuthCallbackPage />,
        },
        // {
        //   path: "*",
        //   element: <Navigate to="/404" replace />,
        // },
      ],
    },
  ]);

  return isAuth ? authenticatedRoutes : unAuthenticatedRoutes;
}
