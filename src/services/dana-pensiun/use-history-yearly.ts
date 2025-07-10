import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";


async function fetchHistoryYearly() {
  const { data } = await http<{ data: any }>(`/v1/pension/history/yearly`);

  return data;
}

export function useHistoryYearly( options: any = {}) {
  const data = useQuery(['history-yearly'], () => fetchHistoryYearly(), {
    ...options,
  });

  return data;
}
