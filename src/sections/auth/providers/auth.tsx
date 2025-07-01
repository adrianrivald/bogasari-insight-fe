/* eslint-disable import/no-cycle */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as sessionService from "../session/session";
import { loginUser } from "../../../services/auth/login";
import { createContext } from "../../../utils/create.context";

interface AuthContextValue {
  // user: AuthUser | null;
  isAuth: boolean;
  logout: () => Promise<void>;
  login: (formField: LoginCredentialsDTO) => Promise<void>;
  currentInternalCompany?: number | null;
}

const [useAuth, AuthInternalProvider] = createContext<AuthContextValue>({
  name: "Auth",
});

export { useAuth };

interface LoginCredentialsDTO {
  email: string;
  password: string;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = React.useState<string | null>(() =>
    sessionService.getSession()
  );
  const [userInfo, setUserInfo] = React.useState<string | null>(() =>
    sessionService.getUser()
  );

  async function login(formField: LoginCredentialsDTO) {
    const { data } = await loginUser(formField);
    const { token } = data;

    sessionService.setSession(token);
    setAccessToken(token);

    navigate("/");
  }

  async function logout() {
    try {
      // Ensure session flush completes
      await sessionService.flushSession();
      setAccessToken(null);
      navigate("/");
    } catch (error) {
      await sessionService.flushSession();
      setAccessToken(null);
      navigate("/");
    }
  }

  return (
    <AuthInternalProvider
      value={{
        isAuth: !!accessToken,
        login,
        logout,
      }}
    >
      {props?.children}
    </AuthInternalProvider>
  );
}
