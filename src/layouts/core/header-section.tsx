import type { Breakpoint } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ToolbarProps } from "@mui/material/Toolbar";
import type { ContainerProps } from "@mui/material/Container";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

import { layoutClasses } from "../classes";
import { Link, useNavigate } from "react-router-dom";
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
  const onOpenMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <AppBar
      position="sticky"
      color="transparent"
      className={layoutClasses.header}
      sx={{
        zIndex: "99",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: {
          xs: 3,
          lg: 4,
        },
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Only bottom shadow

        ...sx,
      }}
      {...other}
    >
      {!isOpen && !menuTitle ? (
        <Link
          to="/"
          style={{
            width: "40%",
          }}
        >
          <Box component="img" src="/images/logo/logo.png" />
        </Link>
      ) : (
        <Box display="flex" gap={2} alignItems="center">
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
          />
          <Typography fontWeight="bold" fontSize={20}>
            {isOpen ? "Menu" : menuTitle}
          </Typography>
        </Box>
      )}
      {isAuth && (
        <Box
          onClick={onOpenMobileMenu}
          component="img"
          src="/images/icons/menu.svg"
          width={24}
          height={24}
        />
      )}
    </AppBar>
  );
}
