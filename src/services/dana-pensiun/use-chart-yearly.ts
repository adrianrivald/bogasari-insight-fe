import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { ChartData } from "./types";


async function fetchChartYearly() {
  const data = await http<ChartData>(`/v1/pension/chart/yearly`);

  return data;
}

export function useChartYearly( dateFilter: string, options: any = {}) {
  const data = useQuery(['chart-yearly', dateFilter], () => fetchChartYearly(), {
    enabled: dateFilter !== "",
    ...options,
  });

  return data;
}
