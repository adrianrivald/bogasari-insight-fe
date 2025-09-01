import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useAuth } from "../../sections/auth/providers/auth";
import dayjs from "dayjs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { getSession } from "../../sections/auth/session/session";
import Cookies from "js-cookie";
import { DOMAIN_NAME } from "../../constants";

interface LeftSideBarSectionProps {
  isAuth: boolean;
  exceptionRoutes: boolean;
  handleLogout: () => void;
}

const LeftSideBarSection = ({
  isAuth,
  exceptionRoutes,
  handleLogout,
}: LeftSideBarSectionProps) => {
  const { userInfo, tokenExpiry } = useAuth();
  const navigate = useNavigate();
  const deviceInfo = JSON.parse(localStorage.getItem("loginInfo") ?? "{}");

  const onGoToDapen = () => {
    setTimeout(() => {
      if (window.location.origin?.includes("frendz.id")) {
        window.location.href = "https://uat-saving.frendz.id/";
      } else {
        window.location.href = "https://bogasari-dapen-fe.vercel.app/";
      }
    }, 500);
  };

  return (
    <React.Fragment>
      {/* Top Sidebar */}
      <Card
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
          p: 2,
          bgcolor: "white",
        }}
      >
        {/* Top Section */}
        <Box
          sx={{
            pb: 4,
            borderBottomWidth: 2,
            borderBottomStyle: "solid",
            borderBottomColor: "grey.300",
          }}
        >
          <Box
            component="img"
            src="/images/ava-dummy.png"
            width={82}
            height={82}
          />
          <Typography fontSize={20} fontWeight="bold" mt={1}>
            {userInfo.fullName}
          </Typography>
          <Typography fontSize={12}>{userInfo.email}</Typography>
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            sx={{ color: "grey.500" }}
          >
            <Box
              component="img"
              src="/images/icons/hashtag.svg"
              width={12}
              height={12}
            />
            <Typography>{userInfo.nikEmployee}</Typography>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            sx={{ color: "grey.500" }}
          >
            <Box
              component="img"
              src="/images/icons/office.svg"
              width={12}
              height={12}
            />
            <Typography>
              Bergabung{" "}
              {userInfo.dJoinDate
                ? dayjs(userInfo.dJoinDate).format("DD MMM YYYY")
                : "-"}
            </Typography>
          </Stack>
          <Button
            sx={{
              mt: 2,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "blue.500",
              borderRadius: "50px",
              py: 1,
              px: 4,
              color: "blue.500",
            }}
          >
            Edit Profile
          </Button>
          <Stack gap={2} mt={2}>
            <Stack direction="row" gap={1}>
              <Box
                component="img"
                src="/images/icons/bank.svg"
                width={24}
                height={24}
              />
              <Typography fontWeight="bold">Rekening Bank</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Box
                component="img"
                src="/images/icons/family.svg"
                width={24}
                height={24}
              />
              <Typography fontWeight="bold">Keluarga</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Bottom Section */}
        <Box py={2} display="flex" flexDirection="column" gap={2}>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Typography fontWeight="bold">No KTP</Typography>
            <Typography>{userInfo.noKtp}</Typography>
          </Stack>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Typography fontWeight="bold">Tanggal Lahir</Typography>
            <Typography>
              {dayjs(userInfo.birthDate).format("DD MMMM YYYY")}
            </Typography>
          </Stack>
          <Stack direction="row" gap={2} justifyContent="space-between">
            <Typography fontWeight="bold">No HP</Typography>
            <Typography>0{userInfo.phoneNumber}</Typography>
          </Stack>
        </Box>
      </Card>

      {/* Middle Sidebar */}
      <Card
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
          p: 2,
          mt: 4,
          bgcolor: "white",
        }}
      >
        <Stack gap={2}>
          <Button
            onClick={() => navigate("/dana-pensiun")}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "start",
              alignItems: "center",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              backgroundColor: "blue.50",
            }}
          >
            <Box
              component="img"
              src="/images/icons/chart.svg"
              width={24}
              height={24}
            />
            <Typography fontWeight="bold" color="black">
              Dana Pensiun
            </Typography>
          </Button>
          <Button
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "start",
              alignItems: "center",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              backgroundColor: "blue.50",
              opacity: 0.6,
            }}
            disabled
          >
            <Box
              component="img"
              src="/images/icons/koperasi.svg"
              width={24}
              height={24}
            />
            <Typography fontWeight="bold" color="black">
              Koperasi
            </Typography>
            <Box
              sx={{
                borderRadius: "50px",
                py: 0.5,
                px: 1.5,
                bgcolor: "#FFCB52",
              }}
            >
              <Typography fontSize={11} color="white" fontWeight="bold">
                Soon
              </Typography>
            </Box>
          </Button>
        </Stack>
      </Card>

      {/* Bottom Sidebar */}
      <Card
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
          mt: 4,
          bgcolor: "white",
        }}
      >
        <Stack gap={2} p={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              <Box
                component="img"
                src="/images/icons/devices.svg"
                width={16}
                height={16}
              />
              <Typography fontSize={16} fontWeight="bold">
                Login Terakhir
              </Typography>
            </Stack>
            <Stack sx={{ flex: "none", width: "50%", textAlign: "right" }}>
              <Typography fontSize={16}>
                {dayjs(deviceInfo.lastLogin).format("DD MMM YYYY")}
              </Typography>
              <Typography fontSize={16}>
                {dayjs(deviceInfo?.lastLogin).format("HH:MM")} WIB
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              <Box
                component="img"
                src="/images/icons/devices-2.svg"
                width={16}
                height={16}
              />
              <Typography fontSize={16} fontWeight="bold">
                Perangkat
              </Typography>
            </Stack>
            <Stack sx={{ flex: "none", width: "50%", textAlign: "right" }}>
              <Typography fontSize={16}>{deviceInfo?.device}</Typography>
              {/* <Typography fontSize={12}>ios 17</Typography> */}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          p={2}
          gap={2}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <Button
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "12px",
              py: 1.5,
              px: 2,
              backgroundColor: "blue.50",
              width: "100%",
            }}
            onClick={onGoToDapen}
          >
            <Typography fontWeight="bold" color="black">
              Pergi ke Dapen
            </Typography>
            <ArrowRightIcon />
          </Button>
        </Stack>

        <Box
          sx={{
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderTopColor: "grey.300",
          }}
        />
        <Stack
          direction="row"
          p={2}
          gap={2}
          sx={{
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          <Box
            component="img"
            src="/images/icons/logout-red.svg"
            width={18}
            height={18}
          />
          <Typography fontSize={16} color="#E40044" fontWeight="bold">
            Keluar
          </Typography>
        </Stack>
      </Card>
    </React.Fragment>
  );
};

export default LeftSideBarSection;
