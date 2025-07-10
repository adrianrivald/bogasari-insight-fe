import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { AmountSummary } from "./types";


async function fetchAmountSummary() {
  const { data } = await http<{ data: AmountSummary }>(`/v1/pension/amount-summary`);

  return data;
}

export function useAmountSummary( dateFilter: string, options: any = {}) {
  const data = useQuery(['ammount-summary', dateFilter], () => fetchAmountSummary(), {
    enabled: dateFilter !== "",
    ...options,
  });

  return data;
}
