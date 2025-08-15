import { PencairanDanaPensiun } from "../../components/module/dana-pensiun/pencairan-dana-pensiun";
import { AppLayout } from "../../layouts/layout";

export function PencairanDanaPensiunView() {
  return (
    <AppLayout
      menuTitle="Pencairan Dana Pensiun"
      containerSx={{
        p: {
          xs: 3,
          lg: 0,
        },
      }}
    >
      <PencairanDanaPensiun />
    </AppLayout>
  );
}
