import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import { HeaderSection } from "../layouts/core/header-section";
import { LayoutSection } from "../layouts/core/layout-section";
import { Container } from "@mui/material";

// ----------------------------------------------------------------------

export type AppLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function AppLayout({ sx, children, header }: AppLayoutProps) {
  const layoutQuery: Breakpoint = "md";

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
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
        {children}
      </Container>
    </LayoutSection>
  );
}
