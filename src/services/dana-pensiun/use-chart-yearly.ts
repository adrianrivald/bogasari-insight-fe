import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";


async function fetchChartYearly() {
  const { data } = await http<{ data: any }>(`/v1/pension/chart/yearly`);

  return data;
}

export function useChartYearly( options: any = {}) {
  const data = useQuery(['chart-yearly'], () => fetchChartYearly(), {
    ...options,
  });

  return data;
}
