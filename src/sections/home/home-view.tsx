import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/providers/auth";
import BalanceCard from "../../components/ui/balance-card";

export function HomeView() {
  const { userInfo } = useAuth();

  return (
    <>
      <Box
        display="flex"
        justifyContent="start"
        sx={
          {
            // backgroundColor: "blue.50",
          }
        }
      >
        {/* User info */}
        <Stack direction="row" gap={2}>
          <Box
            component="img"
            src="/images/ava-dummy.png"
            width={50}
            height={50}
          />
          <Stack direction="column">
            <Typography>Selamat Pagi</Typography>
            <Typography fontWeight="bold" component="span" fontSize={20}>
              {userInfo.email}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Balance */}
      <Box mt={4}>
        <BalanceCard balance="Rp850.750.000" percentage="2,5%" />
      </Box>
    </>
  );
}
