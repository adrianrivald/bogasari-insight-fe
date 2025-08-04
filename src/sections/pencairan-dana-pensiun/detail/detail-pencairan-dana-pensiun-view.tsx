import { DetailPencairanDana } from "../../../components/module/dana-pensiun/detail-pencairan-dana";
import { AppLayout } from "../../../layouts/layout";

export function DetailPencairanDanaView() {
  return (
    <AppLayout withPadding={false} menuTitle="Pencairan Dana Pensiun">
      <DetailPencairanDana />
    </AppLayout>
  );
}
