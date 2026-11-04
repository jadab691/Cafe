import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Panel, SectionTitle, PrimaryButton } from "./AdminUI";

export default function Profile() {
  const [online, setOnline] = useState(true);
  const [gps, setGps] = useState(false);
  const [form, setForm] = useState({
    name: "Chef Marco Bellini",
    branch: "Cafe. - Gulshan Branch",
    email: "admin.marco@cafebistro.com",
    phone: "+8801711-223344",
    address: "House 42, Road 11, Block D, Gulshan-1, Dhaka",
    hours: "10:00 AM – 11:30 PM (Daily)",
    prep: "20",
  });
  const [saved, setSaved] = useState(false);
  const update = (key, value) => { setForm((old) => ({ ...old, [key]: value })); setSaved(false); };

  return (
    <AdminLayout>
      <SectionTitle eyebrow="Account & branch" title="Admin Profile" description="Manage your branch information and operational settings." />
      {saved && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Profile changes saved in this demo.</div>}
      <Panel className="mb-5">
        <div className="flex flex-wrap items-center gap-4"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=240&q=85" alt="Chef Marco" className="h-20 w-20 rounded-full object-cover" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-extrabold">{form.name}</h2><span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-800">Lead</span></div><p className="text-sm text-slate-600">{form.branch}</p><p className="mt-1 text-xs text-slate-500">{form.email}</p><p className="text-xs text-slate-500">{form.phone}</p></div></div>
        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f0f2ff] p-3"><div><p className="font-semibold">Kitchen Open & Accepting</p><p className="text-xs text-slate-500">Instant dispatch to online fleet</p></div><input type="checkbox" checked={online} onChange={(e) => setOnline(e.target.checked)} className="h-5 w-5 accent-orange-700" /></div>
      </Panel>

      <Panel title="Branch Operations" className="mb-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">Admin / Chef Name<input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Branch Name<input value={form.branch} onChange={(e) => update("branch", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Phone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Store Address<textarea rows="2" value={form.address} onChange={(e) => update("address", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Daily Kitchen Hours<input value={form.hours} onChange={(e) => update("hours", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Default Prep SLA (mins)<input type="number" min="1" value={form.prep} onChange={(e) => update("prep", e.target.value)} className="mt-2 w-full rounded-xl border bg-[#f1f3ff] p-3 font-normal" /></label>
        </div>
      </Panel>

      <Panel title="Fulfillment & Rules" className="mb-5">
        <div className="divide-y divide-slate-100">
          <div className="py-3"><div className="flex items-center justify-between gap-3"><p className="font-semibold">First-Accept Logic</p><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Active</span></div><p className="mt-1 text-sm text-slate-500">Any available delivery partner can instantly claim ready orders. The first accepted claim receives the order.</p></div>
          <div className="py-3"><div className="flex items-center justify-between gap-3"><p className="font-semibold">Active Payment Gateways</p><span className="text-xs text-slate-500">2 Enabled</span></div><div className="mt-2 flex gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold">● COD (Cash)</span><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold">● Online Payment</span></div></div>
          <div className="flex items-center justify-between gap-3 py-3"><div><p className="font-semibold">Live GPS Tracking</p><p className="text-xs text-slate-500">Allow live rider location updates.</p></div><input type="checkbox" checked={gps} onChange={(e) => setGps(e.target.checked)} className="h-5 w-5 accent-orange-700" /></div>
        </div>
      </Panel>
      <div className="flex justify-end"><PrimaryButton onClick={() => setSaved(true)}>Save Profile Settings</PrimaryButton></div>
    </AdminLayout>
  );
}
