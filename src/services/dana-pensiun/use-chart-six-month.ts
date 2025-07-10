import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { ChartData } from "./types";


async function fetchChartSixMonth(year: string) {
  const  data = await http<ChartData>(`/v1/pension/chart/six-month?year=${year}`);

  return data;
}

export function useChartSixMonth(year: string, dateFilter: string, options: any = {}) {
  const data = useQuery(['chart-six-month', year, dateFilter], () => fetchChartSixMonth(year), {
    enabled: dateFilter !== "",
    ...options,
  });

  return data;
}
