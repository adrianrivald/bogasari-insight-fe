import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { TransactionHistory } from "./types";


async function fetchTransactionHistory() {
  const data  = await http<TransactionHistory>(`/v1/pension/transaction/history`);

  return data;
}

export function useTransactionHistory( options: any = {}) {
  const data = useQuery(['transaction-history'], () => fetchTransactionHistory(), {
    enabled: true,
    ...options,
  });

  return data;
}
