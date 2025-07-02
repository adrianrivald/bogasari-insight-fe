import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import { HeaderSection } from "../layouts/core/header-section";
import { LayoutSection } from "../layouts/core/layout-section";
import {
  Box,
  Button,
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

// ----------------------------------------------------------------------

export type AppLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 4,
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        flex={1}
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" width="100%" gap={3}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#EAF4FF",
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography fontWeight="bold">Dapen</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              bgcolor: "#EAF4FF",
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography fontWeight="bold">Koprasi</Typography>
          </Box>
        </Box>

        <Button
          onClick={onLogout}
          variant="outlined"
          sx={{
            width: "100%",
            fontWeight: "bold",
            bgcolor: "#fff",
            borderRadius: 2,
            mt: 2,
          }}
        >
          Log Out
        </Button>
      </Stack>
    </Container>
  );
};

export function AppLayout({ children, header }: AppLayoutProps) {
  const { logout } = useAuth();
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
      /** **************************************
       * Header
       *************************************** */
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
            // position: { [layoutQuery]: "fixed" },

            ...header?.sx,
          }}
        />
      }
    >
      <Container
        sx={{
          p: {
            xs: 3,
            lg: 4,
          },
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
