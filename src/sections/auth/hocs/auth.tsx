import { useAuth } from "../providers/auth";
import { SignInPage } from "../../../routes/sections";
import { AppLayout } from "../../../layouts/layout";

export function withAuth(WrappedApp: React.ComponentType) {
  function AppWithAuth() {
    const { isAuth } = useAuth();

    return isAuth ? (
      <AppLayout>
        <WrappedApp />
      </AppLayout>
    ) : (
      <AppLayout>
        <SignInPage />
      </AppLayout>
    );
  }

  const displayName =
    WrappedApp.displayName || WrappedApp.name || "AppComponent";
  AppWithAuth.displayName = `withAuth(${displayName})`;

  return AppWithAuth;
}
