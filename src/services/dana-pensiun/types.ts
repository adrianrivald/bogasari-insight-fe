export interface InfoMonthly {
    currentYear: number;
    currentYearAmount: number;
    previousYear: number;
    previousYearAmount: number;
    total: number;
}
export interface AmountSummary {
    growthPercentage: number
    totalSaldo: number
    user: any
}
export interface ChartData {
    data: any[]
    empNo: string // TODO: Replace with Enum
    total: number
}

export interface HistoryYearly {
    period: string;
    total: number;
    year: number
}