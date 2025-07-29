import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../../sections/auth/providers/auth";
import dayjs from "dayjs";
import React from "react";

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
  const { userInfo, logout } = useAuth();
  return (
    <React.Fragment>
      {/* Top Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
        }}
        p={4}
        borderRadius="8px"
        bgcolor="white"
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
            <Typography>Bergabung 24 Jun 2020</Typography>
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
            <Typography>{userInfo.nikEmployee}</Typography>
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
      </Box>

      {/* Middle Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
        }}
        mt={4}
        p={4}
        borderRadius="8px"
        bgcolor="white"
      >
        <Stack gap={2}>
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
      </Box>

      {/* Bottom Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: isAuth && !exceptionRoutes ? "block" : "none",
          },
        }}
        mt={4}
        borderRadius="8px"
        bgcolor="white"
      >
        <Stack gap={2} p={4}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              <Box
                component="img"
                src="/images/icons/devices.svg"
                width={16}
                height={16}
              />
              <Typography fontSize={12} fontWeight="bold">
                Login Terakhir
              </Typography>
            </Stack>
            <Stack>
              <Typography fontSize={12}>02 Jul 2025</Typography>
              <Typography fontSize={12}>21:45 WIB</Typography>
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
              <Typography fontSize={12} fontWeight="bold">
                Perangkat
              </Typography>
            </Stack>
            <Stack>
              <Typography fontSize={12}>iPhone Pro 16</Typography>
              <Typography fontSize={12}>ios 17</Typography>
            </Stack>
          </Stack>
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
          p={4}
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
          <Typography fontSize={12} color="#E40044" fontWeight="bold">
            Keluar
          </Typography>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default LeftSideBarSection;
