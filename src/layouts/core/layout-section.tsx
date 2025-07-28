import type { Theme, SxProps, CSSObject } from "@mui/material/styles";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import { layoutClasses } from "../classes";
import { useAuth } from "../../sections/auth/providers/auth";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  leftSideBarSection?: React.ReactNode;
  rightSideBarSection?: React.ReactNode;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  leftSideBarSection,
  rightSideBarSection,
}: LayoutSectionProps) {
  return (
    <>
      {/* {inputGlobalStyles} */}

      <Box
        id="root__layout"
        className={layoutClasses.root}
        sx={sx}
        justifyContent="center"
        margin="auto"
        width="100%"
      >
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          className={layoutClasses.hasSidebar}
        >
          {headerSection}
          <Box
            sx={{
              display: {
                xs: "block",
                md: "flex",
              },
              p: {
                xs: 0,
                md: 4,
              },
              justifyContent: {
                md: "space-between",
              },
              gap: {
                md: 4,
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "auto",
                  md: "25%",
                },
              }}
            >
              {leftSideBarSection}
            </Box>
            <Box
              sx={{
                width: {
                  xs: "auto",
                  md: "50%",
                },
              }}
            >
              {children}
            </Box>
            <Box
              sx={{
                width: {
                  xs: "auto",
                  md: "25%",
                },
              }}
            >
              {rightSideBarSection}
            </Box>{" "}
          </Box>
          {footerSection}
        </Box>
      </Box>
    </>
  );
}
