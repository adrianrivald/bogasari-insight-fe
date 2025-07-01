/* eslint-disable import/no-cycle */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as sessionService from "../session/session";
import { loginUser } from "../../../services/auth/login";
import { createContext } from "../../../utils/create.context";
import {
  RegisterResponse,
  registerUser,
} from "../../../services/auth/register";
import { forgotPasswordUser } from "../../../services/auth/forgot-password";

interface AuthContextValue {
  // user: AuthUser | null;
  isAuth: boolean;
  logout: () => Promise<void>;
  login: (formField: CredentialsDTO) => Promise<RegisterResponse>;
  register: (formField: CredentialsDTO) => Promise<RegisterResponse>;
  forgotPassword: (
    formField: Pick<CredentialsDTO, "email">
  ) => Promise<RegisterResponse>;
  currentInternalCompany?: number | null;
}

const [useAuth, AuthInternalProvider] = createContext<AuthContextValue>({
  name: "Auth",
});

export { useAuth };

interface CredentialsDTO {
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

  async function login(formField: CredentialsDTO) {
    const res = await loginUser(formField);
    return res;
  }

  async function register(formField: CredentialsDTO) {
    const res = await registerUser(formField);
    return res;
  }

  async function forgotPassword(formField: Pick<CredentialsDTO, "email">) {
    const res = await forgotPasswordUser(formField);
    return res;
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
        register,
        forgotPassword,
      }}
    >
      {props?.children}
    </AuthInternalProvider>
  );
}
