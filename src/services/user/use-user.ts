import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { useAuth } from "../../sections/auth/providers/auth";

async function fetchUserInfo(userId: number) {
  const data = await http<any>(`/v1/auth/users/${userId}`);

  return data;
}

export function useUserInfo(userId: number, options: any = {}) {
  const { userInfo } = useAuth();
  const data = useQuery(
    ["user-info", userInfo.id],
    () => fetchUserInfo(userId),
    {
      enabled: userId !== undefined,
      ...options,
    }
  );

  return data;
}
