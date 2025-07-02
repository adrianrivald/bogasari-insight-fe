import { http } from "../../utils/http";

export interface LoginCredentialsDTO {
    email: string;
    password: string;
  }

  export interface LoginResponse {
   email: string;
   expires: string;
   id: number;
   role: string;
   token: string
  }

  interface Data {
    token: string
   
    permissions: string[]
  }
  
  export async function loginUser(formData: LoginCredentialsDTO) {
    return http<LoginResponse>('/v1/auth/login', {
      data: {
        email: formData.email,
        password: formData.password,
      },
    });
  }