import { http } from "../../utils/http";

export interface ForgotPasswordCredentialDTO {
    email: string;
  }
  
  export async function forgotPasswordUser(formData: ForgotPasswordCredentialDTO) {
    return http('/v1/auth/forgot-password', {
      data: {
        email: formData.email,
      },
    });
  }