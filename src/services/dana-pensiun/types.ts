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

export interface TransactionHistory {
    empNo: string;
    data: {
        month: string;
        date: string;
        total: number;
        details: {
            code: string;
            description: string;
            amount: number
        }[]
    }[]
}