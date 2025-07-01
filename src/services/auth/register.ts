import { CredentialResponse } from "../../sections/auth/providers/auth";
import { http } from "../../utils/http";

export interface RegisterCredentialDTO {
    email: string;
    password: string;
  }

  
  export async function registerUser(formData: RegisterCredentialDTO) {
    return http<CredentialResponse>('/v1/auth/signup', {
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }