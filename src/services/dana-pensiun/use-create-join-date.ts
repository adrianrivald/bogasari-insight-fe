import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StoreJoinDateParams {
    joinDate?: string;
}

export function useCreateJoinDate() {
    return useMutation(
      async (formData: StoreJoinDateParams) => {
        const {joinDate} = formData
        return http(`/v1/auth/users/check/join-date`, {
          method: "POST",
          data: {
           joinDate
          }
        },
      );
      },
    )
  }
  