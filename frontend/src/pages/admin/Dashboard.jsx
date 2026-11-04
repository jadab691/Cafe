import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { demoOrders, Panel, SectionTitle, StatCard, StatusPill, PrimaryButton } from "./AdminUI";

export default function Dashboard() {
  const pending = demoOrders.filter((o) => o.status === "Pending").length;
  return (
    <AdminLayout>
      <SectionTitle eyebrow="Menu operations" title="Admin Dashboard" description="Your kitchen overview at a glance." action={<span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">● Kitchen Online</span>} />

      <Panel className="mb-5 border-orange-100 bg-gradient-to-r from-orange-50 to-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-700 text-xl text-white">♨</span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-orange-800">Action required · Just now</p>
              <h2 className="mt-1 font-bold">New COD orders need kitchen confirmation & ETA setting!</h2>
              <p className="mt-1 text-sm text-slate-600">{pending} order waiting for confirmation.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/review-now"><PrimaryButton>Review Now →</PrimaryButton></Link>
            <Link to="/admin/orders" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600">View Orders</Link>
          </div>
        </div>
      </Panel>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Today's Revenue" value="Tk 24,850" note="↗ 14.2% from yesterday" icon="▣" />
        <StatCard label="Total Orders Today" value="68" note="8 active orders" icon="▤" tone="blue" />
        <StatCard label="Average Prep Time" value="18 mins" note="Kitchen SLA" icon="◷" tone="purple" />
        <StatCard label="Delivery Fleet" value="4 Online" note="2 on run · 2 idle" icon="♧" tone="green" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Live Pipeline" action={<span className="text-xs font-semibold text-emerald-700">● Real-time sync</span>}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["2", "Pending"], ["3", "Cooking"], ["2", "Ready"], ["1", "On Delivery"]].map(([n, label]) => (
              <div key={label} className="rounded-xl bg-orange-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-orange-800">{n}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/add-food" className="rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm font-bold text-orange-800 hover:bg-orange-100">＋ Add Food</Link>
            <Link to="/admin/orders" className="rounded-xl border border-slate-100 p-4 text-sm font-bold text-slate-700 hover:bg-slate-50">▤ Manage Orders</Link>
            <Link to="/admin/staff" className="rounded-xl border border-slate-100 p-4 text-sm font-bold text-slate-700 hover:bg-slate-50">♙ View Staff</Link>
            <Link to="/admin/profile" className="rounded-xl border border-slate-100 p-4 text-sm font-bold text-slate-700 hover:bg-slate-50">◎ Branch Profile</Link>
          </div>
        </Panel>
      </div>

      <Panel title="Live Orders Feed" className="mt-5" action={<Link to="/admin/orders" className="text-sm font-bold text-orange-800">View All →</Link>}>
        <div className="space-y-3">
          {demoOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
              <div><p className="font-bold">{order.id} <span className="ml-2 text-xs font-normal text-slate-500">{order.time}</span></p><p className="text-sm text-slate-500">{order.customer} · {order.payment}</p></div>
              <div className="flex items-center gap-3"><StatusPill status={order.status} /><strong className="text-orange-800">Tk {order.amount}</strong></div>
            </div>
          ))}
        </div>
      </Panel>
    </AdminLayout>
  );
}
