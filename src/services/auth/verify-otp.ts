import { CredentialResponse } from "../../sections/auth/providers/auth";
import { http } from "../../utils/http";
import { LoginResponse } from "./login";

export interface VerifyOTPCredentialDTO {
    email: string;
    otp: string;
  }

  
  export async function verifyOtpUser(formData: VerifyOTPCredentialDTO) {
    return http<LoginResponse>('/v1/auth/verify-otp', {
      data: {
        email: formData.email,
        otp: formData.otp,
      },
    });
  }