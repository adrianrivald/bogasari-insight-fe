import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { AmountSummary } from "./types";
import { useAuth } from "../../sections/auth/providers/auth";


async function fetchAmountSummary() {
  const { data } = await http<{ data: AmountSummary }>(`/v1/pension/amount-summary`);

  return data;
}

export function useAmountSummary( options: any = {}) {
  const {isAuth} = useAuth()
  const data = useQuery(['ammount-summary'], () => fetchAmountSummary(), {
    enabled: isAuth,
    ...options,
  });

  return data;
}
