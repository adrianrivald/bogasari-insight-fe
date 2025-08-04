import { Suspense } from "react";
import SummaryPencairanDanaPensiun from "../../../pages/pencairan-dana-pensiun/summary";
import { renderFallback } from "../../../routes/sections";
import { AppLayout } from "../../../layouts/layout";

export function SummaryPencairanDanaPensiunView() {
  return (
    <AppLayout menuTitle="Dana Pensiun">
      <Suspense fallback={renderFallback}>
        <SummaryPencairanDanaPensiun />
      </Suspense>
    </AppLayout>
  );
}
