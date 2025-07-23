import { http } from "../../utils/http";

export interface ResetPasswordCredentialDTO {

  email: string;
  token: string;
  password: string;  }
  
  export async function resetPasswordUser(formData: ResetPasswordCredentialDTO) {
    return http('/v1/auth/reset-password', {
      data: {
        email: formData.email,
        token: formData.token,
        password: formData.password
      },
    });
  }