import { Box, Card, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/providers/auth";
import BalanceCard from "../../components/ui/balance-card";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../../layouts/layout";

export function HomeView() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const onClickPenarikanDana = () => {
    navigate("/pencairan-dana-pensiun");
  };

  const onClickDapen = () => {
    navigate("/dana-pensiun");
  };

  return (
    <AppLayout withPadding={false}>
      <Box
        display="flex"
        justifyContent="start"
        sx={{
          p: {
            xs: 3,
            lg: 4,
          },
        }}
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
      <Box
        mt={4}
        sx={{
          px: {
            xs: 3,
            lg: 4,
          },
        }}
      >
        <BalanceCard balance="Rp850.750.000" percentage="2,5%" />
      </Box>

      {/* Menus */}
      <Box
        mt={4}
        sx={{
          px: {
            xs: 3,
            lg: 4,
          },
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Layanan Keuangan</Typography>
        <Stack direction="row" gap={2} mt={2}>
          <Card
            sx={{
              width: "50%",
              p: 2,
              cursor: "pointer",
            }}
            onClick={onClickDapen}
          >
            <Stack direction="row" justifyContent="space-between">
              <Box
                component="img"
                src="/images/icons/dana-home.svg"
                width={56}
                height={56}
              />
            </Stack>
            <Typography mt={2} fontWeight="bold">
              Dana Pensiun
            </Typography>
            <Typography>Tabungan untuk masa pensiun</Typography>
          </Card>
          <Card
            sx={{
              width: "50%",
              p: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Box
                component="img"
                src="/images/icons/koperasi-home.svg"
                width={56}
                height={56}
              />
              <Box
                bgcolor="#FFCB52"
                borderRadius="20px"
                px={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="30px"
              >
                <Typography sx={{ color: "white" }} fontSize="small">
                  Soon
                </Typography>
              </Box>
            </Stack>
            <Typography mt={2} fontWeight="bold">
              Koperasi
            </Typography>
            <Typography>Usaha milik dan untuk anggota</Typography>
          </Card>
        </Stack>
      </Box>

      {/* Penarikan Dana */}
      <Box
        my={4}
        sx={{
          px: {
            xs: 3,
            lg: 4,
          },
        }}
        onClick={onClickPenarikanDana}
      >
        <Typography sx={{ fontWeight: "bold" }}>Penarikan Dana</Typography>
        <Card
          sx={{
            p: 2,
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Box
              component="img"
              src="/images/icons/pencairan-dana-home.svg"
              width={50}
              height={50}
            />
            <Stack>
              <Typography fontWeight="bold">Dana Pensiun</Typography>
              <Typography>Siap Dicairkan</Typography>
            </Stack>
          </Stack>
          <Box
            component="img"
            src="/images/icons/arrow-right.svg"
            width={20}
            height={20}
          />
        </Card>
      </Box>
    </AppLayout>
  );
}
