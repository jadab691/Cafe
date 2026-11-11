import React, { useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  PrimaryButton,
  SearchBox,
  SectionTitle,
  StatusPill,
} from "../../components/admin/AdminControls";
import { demoOrders } from "./adminData";

const filters = ["All", "Pending", "Cooking", "Ready", "On Delivery"];

export default function ManageOrders() {
  const [orders, setOrders] = useState(demoOrders);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [times, setTimes] = useState({});
  const [message, setMessage] = useState("");

  const visible = useMemo(
    () =>
      orders.filter(
        (o) =>
          (filter === "All" || o.status === filter) &&
          `${o.id} ${o.phone} ${o.customer}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [orders, filter, search],
  );

  const confirm = (id) => {
    setOrders((old) =>
      old.map((o) =>
        o.id === id
          ? { ...o, status: "Cooking", prepTime: times[id] || 25 }
          : o,
      ),
    );
    setMessage(`${id} confirmed. Kitchen ETA has been set.`);
  };

  const advance = (id, status) =>
    setOrders((old) => old.map((o) => (o.id === id ? { ...o, status } : o)));

  return (
    <AdminLayout>
      <SectionTitle
        eyebrow="Kitchen operations"
        title="Manage Orders"
        description="Review orders and manage kitchen-to-delivery progress."
        action={
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            ● Live Sync: ON
          </span>
        }
      />
      {message && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          {message}
        </div>
      )}
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search ID, phone, customer..."
        />
        <span className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
          ▣ COD
        </span>
      </div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${filter === f ? "bg-orange-500 text-white" : "bg-white text-slate-600"}`}
          >
            {f}{" "}
            {f === "All"
              ? `(${orders.length})`
              : `(${orders.filter((o) => o.status === f).length})`}
          </button>
        ))}
      </div>

      <div>
        {visible.map((order) => (
          <article
            key={order.id}
            className="border-b border-orange-900 py-5 first:border-t"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold">
                  {order.id}{" "}
                  <span className="ml-2 text-xs font-medium text-slate-400">
                    {order.time}
                  </span>
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <StatusPill status={order.status} />
                  {order.status === "Pending" && (
                    <span className="text-xs font-bold text-orange-700">
                      Action Required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-orange-800">
                  Tk {order.amount}
                </p>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold">
                  {order.payment}
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-3">
              <p className="font-bold">{order.customer}</p>
              <p className="text-sm text-slate-600">☎ {order.phone}</p>
              <p className="text-sm text-slate-500">⌖ {order.address}</p>
            </div>
            <div className="my-4 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between gap-3 text-sm">
                  <span>
                    <b className="mr-2 rounded bg-orange-100 px-2 py-1 text-orange-800">
                      {item.qty}×
                    </b>
                    {item.name}
                  </span>
                  <span className="font-semibold">Tk {item.price}</span>
                </div>
              ))}
            </div>

            {order.status === "Pending" && (
              <div className="rounded-xl bg-orange-50 p-3">
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>♨ Select Kitchen Prep Time</span>
                  <span>{times[order.id] || 25} mins</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 25, 35].map((n) => (
                    <button
                      key={n}
                      onClick={() =>
                        setTimes((old) => ({ ...old, [order.id]: n }))
                      }
                      className={`rounded-full px-2 py-2 text-xs font-bold ${(times[order.id] || 25) === n ? "bg-orange-300 text-white" : "bg-white text-slate-700"}`}
                    >
                      +{n} mins
                    </button>
                  ))}
                </div>
                <PrimaryButton
                  onClick={() => confirm(order.id)}
                  className="mt-3 w-full"
                >
                  ✓ Confirm & Set ETA
                </PrimaryButton>
              </div>
            )}
            {order.status === "Cooking" && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-50 p-3">
                <p className="text-sm font-semibold">
                  Kitchen is preparing this order.
                </p>
                <PrimaryButton onClick={() => advance(order.id, "Ready")}>
                  Mark Kitchen Ready
                </PrimaryButton>
              </div>
            )}
            {order.status === "Ready" && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 p-3">
                <div>
                  <p className="font-bold text-emerald-800">Claim Open</p>
                  <p className="text-xs text-slate-600">
                    Broadcast to available delivery partners.
                  </p>
                </div>
                <PrimaryButton onClick={() => advance(order.id, "On Delivery")}>
                  Assign First Rider
                </PrimaryButton>
              </div>
            )}
            {order.status === "On Delivery" && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50 p-3">
                <div>
                  <p className="font-bold">
                    Rider: {order.rider || "Rahim Khan"}
                  </p>
                  <p className="text-xs text-slate-600">
                    ☎ 01712-345678 · Confirmed → Cooked → Picked → On Way
                  </p>
                </div>

                <PrimaryButton onClick={() => advance(order.id, "Delivered")}>
                  Mark Delivered
                </PrimaryButton>
              </div>
            )}
            {order.status === "Delivered" && (
              <p className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-600">
                Order delivered successfully.
              </p>
            )}
          </article>
        ))}
        {visible.length === 0 && (
          <p className="border-y border-orange-100 py-10 text-center text-slate-500">
            No matching orders found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
