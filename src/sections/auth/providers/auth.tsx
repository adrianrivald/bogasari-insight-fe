/* eslint-disable import/no-cycle */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as sessionService from "../session/session";
import { loginUser } from "../../../services/auth/login";
import { createContext } from "../../../utils/create.context";
import { registerUser } from "../../../services/auth/register";
import { forgotPasswordUser } from "../../../services/auth/forgot-password";
import { resetPasswordUser } from "../../../services/auth/reset-password";
import {
  VerifyOTPCredentialDTO,
  verifyOtpUser,
} from "../../../services/auth/verify-otp";

interface AuthContextValue {
  // user: AuthUser | null;
  isAuth: boolean;
  logout: () => Promise<void>;
  login: (formField: CredentialsDTO) => Promise<CredentialResponse>;
  register: (formField: CredentialsDTO) => Promise<CredentialResponse>;
  forgotPassword: (
    formField: Pick<CredentialsDTO, "email">
  ) => Promise<CredentialResponse>;
  resetPassword: (
    formField: CredentialsResetPasswordDTO
  ) => Promise<CredentialResponse>;
  verifyOtp: (formField: VerifyOTPCredentialDTO) => Promise<CredentialResponse>;
  currentInternalCompany?: number | null;
}

const [useAuth, AuthInternalProvider] = createContext<AuthContextValue>({
  name: "Auth",
});

export { useAuth };

export interface CredentialResponse {
  message: string;
}
interface CredentialsDTO {
  email: string;
  password: string;
}

interface CredentialsResetPasswordDTO {
  email: string;
  otp: string;
  newPassword: string;
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

  async function verifyOtp(formField: VerifyOTPCredentialDTO) {
    const res = await verifyOtpUser(formField);
    return res;
  }

  async function forgotPassword(formField: Pick<CredentialsDTO, "email">) {
    const res = await forgotPasswordUser(formField);
    return res;
  }
  async function resetPassword(formField: CredentialsResetPasswordDTO) {
    const res = await resetPasswordUser(formField);
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
        resetPassword,
        verifyOtp,
      }}
    >
      {props?.children}
    </AuthInternalProvider>
  );
}
