import { Link } from "react-router-dom";
import { StatusPill } from "../../components/admin/AdminControls";

const metrics = [
  { label: "Today's Revenue", value: "Tk 24,850", note: "↗ 14.2% from yesterday" },
  { label: "Total Orders Today", value: "68", note: "8 active orders" },
  { label: "Average Prep Time", value: "18 mins", note: "Kitchen SLA" },
  { label: "Delivery Fleet", value: "4 Online", note: "2 on run · 2 idle" },
];

const pipeline = [
  { count: "2", label: "Pending" },
  { count: "3", label: "Cooking" },
  { count: "2", label: "Ready" },
  { count: "1", label: "On Delivery" },
];

const actions = [
  { label: "＋ Add Food", path: "/admin/add-food" },
  { label: "▤ Manage Orders", path: "/admin/orders" },
  { label: "★ Customer Reviews", path: "/admin/reviews" },
  { label: "♙ View Staff", path: "/admin/staff" },
];

export function PendingOrdersNotice({ count }) {
  return (
    <section className="mb-8 rounded-3xl border border-orange-100 bg-gradient-to-br from-red-300 via-white to-red-100 p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl text-white">
            ♨
          </span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-orange-400">
              Action required · Just now
            </p>
            <h2 className="mt-1 font-bold text-slate-900">
              New COD orders need kitchen confirmation &amp; ETA setting!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {count} {count === 1 ? "order is" : "orders are"} waiting for confirmation.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pl-16 sm:pl-0">
          <Link
            to="/admin/review-now"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Review Now →
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-orange-50"
          >
            View Orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export function DashboardMetrics() {
  return (
    <dl className="mb-9 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-green-200 py-5 lg:grid-cols-4 bg-gradient-to-br from-orange-200 via-white to-green-100">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0 border-l-2 border-orange-200 pl-3 sm:pl-4">
          <dt className="text-sm font-semibold text-slate-700">{metric.label}</dt>
          <dd className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            {metric.value}
          </dd>
          <p className="mt-1 text-xs text-slate-500">{metric.note}</p>
        </div>
      ))}
    </dl>
  );
}

export function OrderPipeline() {
  return (
    <section aria-labelledby="pipeline-heading">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="pipeline-heading" className="text-lg font-extrabold text-slate-900">
          Live Pipeline
        </h2>
        <span className="text-xs font-semibold text-emerald-700">● Real-time sync</span>
      </div>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-4 border-y border-orange-100 py-5 sm:grid-cols-4 bg-gradient-to-br from-yellow-200 via-white to-green-100">
        {pipeline.map(({ count, label }) => (
          <div key={label}>
            <dt className="mt-1 text-xs font-bold uppercase text-slate-600">{label}</dt>
            <dd className="text-2xl font-extrabold text-orange-600">{count}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function QuickActions() {
  return (
    <nav aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="mb-4 text-lg font-extrabold text-green-400">
        Quick Actions
      </h2>
      <ul className="divide-y divide-orange-100 border-y border-orange-100">
        {actions.map((action) => (
          <li key={action.path}>
            <Link
              to={action.path}
              className="block py-3 text-sm font-semibold text-slate-700 transition hover:pl-1 hover:text-orange-600"
            >
              {action.label}
              <span className="float-right text-orange-500" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function RecentOrders({ orders }) {
  return (
    <section className="mt-9" aria-labelledby="recent-orders-heading">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 id="recent-orders-heading" className="text-lg font-extrabold text-blue-900">
          Live Orders Feed
        </h2>
        <Link to="/admin/orders" className="text-sm font-bold text-blue-600 hover:text-blue-700">
          View All →
        </Link>
      </div>
      <ul className="divide-y divide-blue-100 border-y border-blue-100">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <p className="font-bold text-slate-900">
                {order.id} <span className="ml-2 text-xs font-normal text-slate-500">{order.time}</span>
              </p>
              <p className="text-sm text-slate-500">
                {order.customer} · {order.payment}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusPill status={order.status} />
              <strong className="text-orange-700">Tk {order.amount}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
