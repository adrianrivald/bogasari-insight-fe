import { Card, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomeTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(
    location.pathname.includes("/dana-pensiun") ? 0 : 1
  );
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const onClickMenu = (menu: string) => {
    navigate(menu);
  };

  return (
    <Card
      sx={{
        pt: 2,
        px: 3,
        bgcolor: "white",
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <Typography fontWeight="bold" fontSize={24}>
        Dana Pensiun Iuran Pasti (DPIP)
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="dana pensiun tab"
        TabIndicatorProps={{ style: { display: "none" } }} // hide default underline
        sx={{
          mt: 4,
        }}
      >
        <Tab
          sx={{
            px: 4,
            color: "gray",
            "&.Mui-selected": {
              color: "blue.500",
              borderBottom: "2px solid #4AA1F3",
            },
          }}
          label="Personal Balance"
          onClick={() => onClickMenu("/dana-pensiun")}
          {...a11yProps(0)}
        />
        {/* <Tab
          sx={{
            px: 4,
            color: "gray",
            "&.Mui-selected": {
              color: "blue.500",
              borderBottom: "2px solid #4AA1F3",
            },
          }}
          label="Pencairan Dana"
          // onClick={() => onClickMenu("/pencairan-dana-pensiun")}
          {...a11yProps(1)}
        /> */}
      </Tabs>
    </Card>
  );
};

export default HomeTab;
