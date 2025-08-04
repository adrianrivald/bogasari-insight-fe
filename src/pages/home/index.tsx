import { Helmet } from "react-helmet-async";
import { HomeView } from "../../sections/home/home-view";
import { AppLayout } from "../../layouts/layout";
import { useAuth } from "../../sections/auth/providers/auth";
import { useUserInfo } from "../../services/user";
import { useEffect } from "react";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - Bogasari Insight`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>

      <HomeView />
    </>
  );
}
