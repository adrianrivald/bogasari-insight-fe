import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { InfoMonthly } from "./types";


async function fetchInfoMonthly() {
  const { data } = await http<{ data: InfoMonthly }>(`/v1/pension/monthly/info`);

  return data;
}

export function useInfoMonthly(  options: any = {}) {
  const data = useQuery(['info-monthly'], () => fetchInfoMonthly(), {
    enabled: true,
    ...options,
  });

  return data;
}
