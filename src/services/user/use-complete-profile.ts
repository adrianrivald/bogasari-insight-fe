import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StoreCompleteProfile {
    fullName?: string;
    phoneNumber?: string;
    birthDate?: string;
    noKtp?: string;
    nikEmployee?: number
}

export function useCompleteProfile() {
    return useMutation(
      async (formData: StoreCompleteProfile) => {
        const {fullName, phoneNumber, birthDate, noKtp, nikEmployee} = formData
        return http(`/v1/auth/complete-profile`, {
        method: "PUT",
          data: {
            fullName,
            phoneNumber,
            birthDate,
            noKtp,
            nikEmployee
          }
        },);
      },
    )
  }
  