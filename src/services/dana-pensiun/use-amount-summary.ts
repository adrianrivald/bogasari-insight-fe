import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { AmountSummary } from "./types";


async function fetchAmountSummary() {
  const { data } = await http<{ data: AmountSummary }>(`/v1/pension/amount-summary`);

  return data;
}

export function useAmountSummary( options: any = {}) {
  const data = useQuery(['ammount-summary'], () => fetchAmountSummary(), {
    enabled: true,
    ...options,
  });

  return data;
}
