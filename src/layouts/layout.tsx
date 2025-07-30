import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import { HeaderSection } from "../layouts/core/header-section";
import { LayoutSection } from "../layouts/core/layout-section";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useAuth } from "../sections/auth/providers/auth";
import { Bounce, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import LeftSideBarSection from "./core/left-sidebar-section";
import RightSideBarSection from "./core/right-sidebar-section";

// ----------------------------------------------------------------------

export type AppLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  menuTitle?: string;
  withPadding?: boolean;
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 4,
      }}
    >
      <Box
        position="relative"
        sx={{
          minHeight: "80vh",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          flex={1}
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" width="100%" gap={3}>
            <Link
              href="/profile"
              underline="none"
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Card
                sx={{
                  p: 2,
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" gap={2}>
                    <Box
                      component="img"
                      src="/images/ava-dummy.png"
                      width={50}
                      height={50}
                    />
                    <Stack direction="column">
                      <Typography>Selamat Pagi</Typography>
                      <Typography
                        fontWeight="bold"
                        component="span"
                        fontSize={20}
                      >
                        example@gmail.com
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box
                    component="img"
                    src="/images/icons/chevron-right.svg"
                    width={20}
                    height={20}
                  />
                </Stack>
              </Card>
            </Link>
            <Link
              href="/dana-pensiun"
              underline="none"
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Card
                sx={{
                  px: 2,
                  py: 4,
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Box
                    component="img"
                    src="/images/icons/money.svg"
                    width={20}
                    height={20}
                  />
                  <Typography>DPP</Typography>
                </Stack>
              </Card>
            </Link>
          </Box>

          <Card
            sx={{
              px: 2,
              py: 4,
              width: "100%",
              position: "absolute",
              bottom: 0,
              cursor: "pointer",
            }}
            onClick={onLogout}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                component="img"
                src="/images/icons/logout.svg"
                width={20}
                height={20}
              />
              <Typography>Log Out</Typography>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
};

export function AppLayout({
  children,
  header,
  menuTitle,
  withPadding = true,
}: AppLayoutProps) {
  const { isAuth, logout } = useAuth();
  const location = useLocation();
  const exceptionRoutes =
    location.pathname === "/success-registration" ||
    location.pathname === "/complete-profile";
  const layoutQuery: Breakpoint = "md";
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setTimeout(() => {
        setIsLogoutPopupOpen(false);
        setIsOpen(false);
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.message ?? "Terjadi error, silakan coba lagi";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, []);

  return (
    <LayoutSection
      sx={
        {
          // bgcolor: {
          //   md: isAuth && !exceptionRoutes ? "#F5F6FA" : "",
          // },
        }
      }
      leftSideBarSection={
        <LeftSideBarSection
          isAuth={isAuth}
          exceptionRoutes={exceptionRoutes}
          handleLogout={() => setIsLogoutPopupOpen(true)}
        />
      }
      rightSideBarSection={
        <RightSideBarSection
          isAuth={isAuth}
          exceptionRoutes={exceptionRoutes}
        />
      }
      headerSection={
        <HeaderSection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          layoutQuery={layoutQuery}
          slotProps={{
            container: { maxWidth: false },
            toolbar: {
              sx: { bgcolor: "transparent", backdropFilter: "unset" },
            },
          }}
          sx={{
            ...header?.sx,
          }}
          menuTitle={menuTitle}
        />
      }
    >
      <Container
        disableGutters
        sx={{
          p:
            withPadding && !isOpen
              ? {
                  xs: 3,
                  lg: 4,
                }
              : 0,
          bgcolor: "white",
        }}
      >
        {isOpen ? (
          <Dashboard onLogout={() => setIsLogoutPopupOpen(true)} />
        ) : (
          children
        )}
      </Container>
      <Dialog
        open={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Keluar Akun</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin keluar dari akun?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsLogoutPopupOpen(false)}
            sx={{ color: "#65676B", fontWeight: "normal" }}
          >
            Batal
          </Button>
          <Button
            onClick={handleLogout}
            autoFocus
            sx={{ color: "#4AA1F3", fontWeight: "normal" }}
          >
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutSection>
  );
}
