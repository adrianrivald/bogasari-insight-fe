import { Suspense } from "react";
import { DanaPensiun } from "../../components/module/dana-pensiun/dana-pensiun";
import { AppLayout } from "../../layouts/layout";
import { renderFallback } from "../../routes/sections";

export function DanaPensiunView() {
  return (
    <AppLayout menuTitle="Dana Pensiun">
      <Suspense fallback={renderFallback}>
        <DanaPensiun />
      </Suspense>
    </AppLayout>
  );
}
