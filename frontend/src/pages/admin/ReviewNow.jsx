import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { PrimaryButton, SectionTitle } from "../../components/admin/AdminControls";
import { demoOrders } from "./adminData";

export default function ReviewNow() {
  const [orders, setOrders] = useState(demoOrders.filter((o) => o.status === "Pending"));
  const [prep, setPrep] = useState({});
  const [done, setDone] = useState([]);
  const confirm = (id) => {
    setOrders((old) => old.filter((o) => o.id !== id));
    setDone((old) => [...old, id]);
  };

  return (
    <AdminLayout>
      <SectionTitle eyebrow="Action required" title="Review New Orders" description="Confirm incoming orders and set a preparation ETA." action={<Link to="/admin/orders" className="text-sm font-bold text-orange-800">← All Orders</Link>} />
      {done.length > 0 && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Confirmed in this demo: {done.join(", ")}</div>}
      {orders.length === 0 ? <section className="border-y border-orange-100 py-10 text-center"><p className="text-3xl">✓</p><h2 className="mt-2 font-bold">You're all caught up!</h2><p className="text-sm text-slate-500">There are no pending orders in this demo.</p></section> :
        <div>{orders.map((o) => <article key={o.id} className="border-b border-orange-100 py-5 first:border-t">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">PENDING CONFIRMATION</span><h2 className="mt-2 text-xl font-extrabold">{o.id}</h2><p className="text-xs text-slate-500">Received {o.time}</p></div><div className="text-right"><p className="text-xl font-extrabold text-orange-800">Tk {o.amount}</p><span className="text-xs font-bold">{o.payment}</span></div></div>
          <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-4"><p className="font-bold">{o.customer}</p><p className="text-sm text-slate-600">☎ {o.phone}</p><p className="text-sm text-slate-600">⌖ {o.address}</p></div>
          <div className="my-4 space-y-2">{o.items.map((item, i) => <div key={i} className="flex justify-between text-sm"><span>{item.qty}× {item.name}</span><b>Tk {item.price}</b></div>)}</div>
          <div className="rounded-xl bg-orange-50 p-4"><div className="mb-3 flex justify-between text-sm font-bold"><span>Kitchen preparation time</span><span>{prep[o.id] || 25} mins</span></div><div className="grid grid-cols-3 gap-2">{[15, 25, 35].map((n) => <button key={n} onClick={() => setPrep((old) => ({ ...old, [o.id]: n }))} className={`rounded-full py-2 text-xs font-bold ${(prep[o.id] || 25) === n ? "bg-orange-500 text-white" : "bg-white text-slate-700"}`}>+{n} mins</button>)}</div><PrimaryButton onClick={() => confirm(o.id)} className="mt-4 w-full">✓ Confirm Order & Set ETA</PrimaryButton></div>
        </article>)}</div>}
    </AdminLayout>
  );
}
