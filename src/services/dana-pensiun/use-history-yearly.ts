import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { HistoryYearly } from "./types";


async function fetchHistoryYearly() {
  const { data } = await http<{ data: HistoryYearly[] }>(`/v1/pension/history/yearly`);

  return data;
}

export function useHistoryYearly(  options: any = {}) {
  const data = useQuery(['history-yearly'], () => fetchHistoryYearly(), {
    enabled: true,
    ...options,
  });

  return data;
}
