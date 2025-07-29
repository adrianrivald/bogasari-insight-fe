import { Box } from "@mui/material";

interface RightSideBarSectionProps {
  isAuth: boolean;
  exceptionRoutes: boolean;
}

const RightSideBarSection = ({
  isAuth,
  exceptionRoutes,
}: RightSideBarSectionProps) => {
  return (
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
    ></Box>
  );
};

export default RightSideBarSection;
