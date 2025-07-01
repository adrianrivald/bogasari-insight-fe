import { http } from "../../utils/http";

export interface ResetPasswordCredentialDTO {

  email: string;
  otp: string;
  newPassword: string;  }
  
  export async function resetPasswordUser(formData: ResetPasswordCredentialDTO) {
    return http('/v1/auth/reset-password', {
      data: {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      },
    });
  }