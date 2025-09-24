import { Box, Card, Stack, Typography } from "@mui/material";
import { useAuth } from "../auth/providers/auth";
import BalanceCard from "../../components/ui/balance-card";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../../layouts/layout";
import { useAmountSummary } from "../../services/dana-pensiun/use-amount-summary";
import { formatRupiah } from "../../utils/format-rupiah";
import { Suspense, useEffect, useState } from "react";
import { renderFallback } from "../../routes/sections";
import dayjs from "dayjs";
import { useUserInfo } from "../../services/user";
import { getTimeOfDay } from "../../helper/get-time-of-day";

export function HomeView() {
  const { userInfo: user, setUserInfo: setUser } = useAuth();
  const [userInfo, setUserInfo] = useState<any>({});
  const navigate = useNavigate();
  const { data: amountSummary } = useAmountSummary();
  const isProfileComplete = amountSummary?.user !== null;

  const onClickDapen = () => {
    navigate("/dana-pensiun");
  };

  // Desktop Home states
  const [tabIndex, setTabIndex] = useState(0);

  const { data, isSuccess } = useUserInfo(user.id);

  useEffect(() => {
    if (isSuccess) {
      if (
        data.data.nikEmployee === null &&
        data.data.email !== "admin@gmail.com"
      ) {
        navigate("/complete-profile");
        return;
      }
      setUserInfo(data.data);
      setUser(JSON.stringify(data?.data));
    }
  }, [data]);

  useEffect(() => {
    const currentUserInfo = JSON.parse(
      localStorage.getItem("user_info") ?? "{}"
    );
    localStorage.setItem(
      "user_info",
      JSON.stringify({
        ...currentUserInfo,
        ...data?.data,
      })
    );
    console.log(data, "datauser");
  }, [userInfo]);

  return (
    <AppLayout withPadding={false}>
      {/* Mobile Home */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
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
              <Typography>Halo</Typography>
              <Typography fontWeight="bold" component="span" fontSize={20}>
                {userInfo.fullName}
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
          <Suspense fallback={renderFallback}>
            <BalanceCard
              balance={formatRupiah(amountSummary?.totalSaldo ?? 0)}
              percentage={`${amountSummary?.growthPercentage}%`}
              isProfileComplete={isProfileComplete}
            />
          </Suspense>
        </Box>

        {/* Menus */}
        <Box
          my={4}
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
                width: "100%",
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
            {/* <Card
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
            </Card> */}
          </Stack>
        </Box>

        {/* Penarikan Dana */}
        {/* <Box
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
        </Box> */}
      </Box>

      {/* Desktop Home */}
      <Box
        sx={{
          px: 0,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Card
          sx={{
            py: 2,
            px: 3,
            bgcolor: "white",
          }}
        >
          <Stack direction="row">
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                Nama
              </Typography>
              <Typography fontSize={16}>{userInfo.fullName}</Typography>
            </Stack>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                OPU
              </Typography>
              <Typography fontSize={16}>
                {userInfo?.opuDescription ?? "-"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" mt={4}>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                No Gaji
              </Typography>
              <Typography fontSize={16}>{userInfo.nikEmployee}</Typography>
            </Stack>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                Tanggal Lahir
              </Typography>
              <Typography fontSize={16}>
                {dayjs(userInfo.birthDate).format("DD MMMM YYYY")}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" mt={4}>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                Tanggal Masuk DPIP
              </Typography>
              <Typography fontSize={16}>
                {userInfo.dJoinDate
                  ? dayjs(userInfo.dJoinDate).format("DD MMMM YYYY")
                  : "-"}
              </Typography>
            </Stack>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                Tanggal Masuk Kerja
              </Typography>
              <Typography fontSize={16}>
                {" "}
                {userInfo.joinDate
                  ? dayjs(userInfo.joinDate).format("DD MMMM YYYY")
                  : "-"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" mt={4}>
            <Stack gap={1} width="50%">
              <Typography fontSize={16} fontWeight="bold">
                Sisa Masa Kerja
              </Typography>
              <Typography fontSize={16}>
                {/* 55 Tahun - usia */}
                {55 - dayjs().diff(dayjs(userInfo.birthDate), "year")} tahun
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </AppLayout>
  );
}
