import AdminLayout from "./AdminLayout";
import { SectionTitle } from "../../components/admin/AdminControls";
import { demoOrders } from "./adminData";
import {
  DashboardMetrics,
  OrderPipeline,
  PendingOrdersNotice,
  QuickActions,
  RecentOrders,
} from "./DashboardSections";

export default function Dashboard() {
  const pending = demoOrders.filter((order) => order.status === "Pending").length;

  return (
    <AdminLayout>
      <SectionTitle
        eyebrow="Menu operations"
        title="Admin Dashboard"
        description="Your kitchen overview at a glance."
        action={
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            ● Kitchen Online
          </span>
        }
      />

      <PendingOrdersNotice count={pending} />
      <DashboardMetrics />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <OrderPipeline />
        <QuickActions />
      </div>

      <RecentOrders orders={demoOrders.slice(0, 3)} />
    </AdminLayout>
  );
}
