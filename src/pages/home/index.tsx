import { Helmet } from "react-helmet-async";
import { HomeView } from "../../sections/home/home-view";
import { AppLayout } from "../../layouts/layout";
import { useAuth } from "../../sections/auth/providers/auth";
import { useUserInfo } from "../../services/user";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function HomePage() {
  const { userInfo } = useAuth();
  const { data, refetch } = useUserInfo(userInfo.id);

  useEffect(() => {
    const currentUserInfo = JSON.parse(
      localStorage.getItem("user_info") ?? "{}"
    );
    localStorage.setItem(
      "user_info",
      JSON.stringify({
        ...currentUserInfo,
        ...data?.data,
      })
    );
    console.log(data, "datauser");
  }, [userInfo]);

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
