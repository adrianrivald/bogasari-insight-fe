import type { Breakpoint } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ToolbarProps } from "@mui/material/Toolbar";
import type { ContainerProps } from "@mui/material/Container";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

import { layoutClasses } from "../classes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../sections/auth/providers/auth";

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    toolbar?: ToolbarProps;
    container?: ContainerProps;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuTitle?: string;
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  layoutQuery = "md",
  isOpen,
  setIsOpen,
  menuTitle,
  ...other
}: HeaderSectionProps) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const location = useLocation();
  const exceptionRoutes =
    location.pathname === "/success-registration" ||
    location.pathname === "/complete-profile";
  console.log(exceptionRoutes, "location");
  const onOpenMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <AppBar
      color="transparent"
      className={layoutClasses.header}
      sx={{
        position: {
          xs: "sticky",
          md: "relative",
        },
        zIndex: "99",
        width: "100%",
        display: "flex",
        justifyContent: {
          xs: "space-between",
          md: isAuth && !exceptionRoutes ? "space-between" : "center",
        },
        padding: {
          xs: 3,
          lg: 4,
        },
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: {
          xs: "0 4px 6px rgba(0, 0, 0, 0.1)", // Only bottom shadow
          md:
            isAuth && !exceptionRoutes
              ? "0 4px 6px rgba(0, 0, 0, 0.1)"
              : "none",
        },

        ...sx,
      }}
      {...other}
    >
      {/* {!isOpen && !menuTitle ? ( */}
      <Box
        sx={{
          display: {
            xs: !isOpen && !menuTitle ? "flex" : "none",
            md: "flex",
          },
        }}
      >
        <Link to="/">
          <Box
            sx={{
              width: {
                xs: "100px",
                md: "200px",
              },
              marginTop: {
                md: !isAuth ? "44px" : "",
              },
            }}
            component="img"
            src="/images/logo/logo.png"
          />
        </Link>
      </Box>

      <Box
        gap={2}
        alignItems="center"
        sx={{
          display: {
            xs: isOpen || menuTitle ? "flex" : "none",
            md: "none",
          },
        }}
      >
        <Box
          onClick={() => {
            if (isOpen) {
              setIsOpen((prev) => !prev);
              return;
            }
            navigate("/");
          }}
          component="img"
          src="/images/icons/back.svg"
          width={24}
          height={24}
          sx={{ cursor: "pointer" }}
        />
        <Typography fontWeight="bold" fontSize={20}>
          {isOpen ? "Menu" : menuTitle}
        </Typography>
      </Box>
      {isAuth && !exceptionRoutes && (
        <Box
          onClick={onOpenMobileMenu}
          component="img"
          src="/images/icons/menu.svg"
          width={24}
          height={24}
          sx={{
            cursor: "pointer",
            display: {
              xs: "block",
              md: "none",
            },
          }}
        />
      )}

      {isAuth && !exceptionRoutes && (
        <Box
          // onClick={onOpenMobileMenu}
          component="img"
          src="/images/icons/notifications.svg"
          width={24}
          height={24}
          sx={{
            cursor: "pointer",
            display: {
              xs: "none",
              md: "block",
            },
          }}
        />
      )}
    </AppBar>
  );
}
