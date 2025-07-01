import { http } from "../../utils/http";

export interface RegisterCredentialDTO {
    email: string;
    password: string;
  }

  export interface RegisterResponse {
    message: string;
  }
  
  export async function registerUser(formData: RegisterCredentialDTO) {
    return http<RegisterResponse>('/v1/auth/signup', {
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }