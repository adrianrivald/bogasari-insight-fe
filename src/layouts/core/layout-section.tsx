import type { Theme, SxProps, CSSObject } from "@mui/material/styles";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import { layoutClasses } from "../classes";

// ----------------------------------------------------------------------

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
}: LayoutSectionProps) {
  const theme = useTheme();

  return (
    <>
      {/* {inputGlobalStyles} */}

      <Box
        id="root__layout"
        className={layoutClasses.root}
        sx={sx}
        maxWidth={768}
        justifyContent="center"
        margin="auto"
        width="100%"
      >
        {sidebarSection}
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection="column"
          className={layoutClasses.hasSidebar}
        >
          {headerSection}
          {children}
          {footerSection}
        </Box>
      </Box>
    </>
  );
}
