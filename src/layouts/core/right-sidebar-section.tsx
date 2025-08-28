import { Box, Card, Stack, Typography } from "@mui/material";
import React, { Suspense } from "react";
import BalanceCard from "../../components/ui/balance-card";
import { useAmountSummary } from "../../services/dana-pensiun/use-amount-summary";
import { formatRupiah } from "../../utils/format-rupiah";
import { renderFallback } from "../../routes/sections";

interface RightSideBarSectionProps {
  isAuth: boolean;
  exceptionRoutes: boolean;
}

const RightSideBarSection = ({
  isAuth,
  exceptionRoutes,
}: RightSideBarSectionProps) => {
  const { data: amountSummary } = useAmountSummary();

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: isAuth && !exceptionRoutes ? "block" : "none",
        },
      }}
    >
      <Suspense fallback={renderFallback}>
        <BalanceCard
          balance={formatRupiah(amountSummary?.totalSaldo ?? 0)}
          percentage={`${amountSummary?.growthPercentage}%`}
        />
      </Suspense>
      <Card
        sx={{
          p: 2,
          mt: 4,
          bgcolor: "white",
        }}
      >
        <Typography fontWeight="bold" fontSize={20}>
          Status Pencairan
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack gap={1} alignContent="center" justifyContent="center">
            <Box
              component="img"
              src="/images/empty-state.png"
              width={144}
              height={144}
              sx={{ margin: "auto" }}
            />
            <Typography fontSize={20} fontWeight="bold" mx="auto">
              Belum ada data
            </Typography>
            <Typography
              mx="auto"
              textAlign="center"
              fontSize={14}
              color="grey.500"
            >
              Kamu belum ada mencairkan dana pensiun
            </Typography>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default RightSideBarSection;
