import React, { useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { PrimaryButton, SearchBox, SectionTitle, StatusPill } from "../../components/admin/AdminControls";

const initialStaff = [
  { id: 12, name: "Rahim Khan", phone: "01712-345678", role: "Delivery Partner", status: "On Delivery", detail: "CF-2085 · Destination ETA ~7 mins", rating: "4.9", delivered: 14 },
  { id: 8, name: "Tanvir Hossain", phone: "01822-998877", role: "Delivery Partner", status: "Idle", detail: "Listening to dispatch broadcasts", rating: "4.8", delivered: 9 },
  { id: 3, name: "Chef Marco Bellini", phone: "01711-223344", role: "Head Chef", status: "Cooking", detail: "Station: Main Grill & Burgers", rating: "4.9", delivered: 0 },
  { id: 4, name: "Nadia Islam", phone: "01911-223344", role: "Kitchen Crew", status: "Active", detail: "Prep station", rating: "—", delivered: 0 },
];

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", role: "Kitchen Crew" });

  const visible = useMemo(() => staff.filter((s) =>
    (role === "All" || s.role === role) &&
    `${s.name} ${s.phone} ${s.role}`.toLowerCase().includes(search.toLowerCase())
  ), [staff, role, search]);

  const addMember = (e) => {
    e.preventDefault();
    setStaff((old) => [...old, { ...form, id: Date.now(), status: "Idle", detail: "New team member", rating: "—", delivered: 0 }]);
    setForm({ name: "", phone: "", role: "Kitchen Crew" });
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <SectionTitle eyebrow="Team operations" title="Staff & Riders" description="Manage active kitchen crew, delivery fleet and team roles." action={<span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">● Live Shift</span>} />
      <dl className="mb-6 grid grid-cols-3 gap-4 border-y border-orange-100 py-5">
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4"><dt className="text-xs text-slate-500">Total Staff</dt><dd className="text-2xl font-extrabold">{staff.length + 4}</dd></div>
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4"><dt className="text-xs text-slate-500">On Shift Now</dt><dd className="text-2xl font-extrabold">5</dd></div>
        <div className="border-l-2 border-orange-200 pl-3 sm:pl-4"><dt className="text-xs text-slate-500">Riders · 2 Active</dt><dd className="text-2xl font-extrabold">4</dd></div>
      </dl>
      <div className="mb-4"><SearchBox value={search} onChange={setSearch} placeholder="Search by name, role, or phone..." /></div>
      <PrimaryButton onClick={() => setShowForm(!showForm)} className="mb-4 w-full">＋ Add New Member</PrimaryButton>
      {showForm && <section aria-labelledby="add-member-heading" className="mb-5 border-y border-orange-100 py-5"><h2 id="add-member-heading" className="mb-3 font-bold">Add Team Member</h2><form onSubmit={addMember} className="grid gap-3 sm:grid-cols-3"><input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-orange-100 bg-white p-3 text-sm" /><input required placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-orange-100 bg-white p-3 text-sm" /><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-xl border border-orange-100 bg-white p-3 text-sm"><option>Kitchen Crew</option><option>Delivery Partner</option><option>Manager</option></select><PrimaryButton type="submit" className="sm:col-span-3">Save Member</PrimaryButton></form></section>}
      <div className="mb-4 flex flex-wrap gap-2">{["All", "Delivery Partner", "Kitchen Crew", "Head Chef", "Manager"].map((r) => <button key={r} onClick={() => setRole(r)} className={`rounded-full px-3 py-2 text-xs font-bold ${role === r ? "bg-orange-500 text-white" : "bg-white text-slate-600"}`}>{r}</button>)}</div>
      <div>{visible.map((person) => <article key={person.id} className="border-b border-orange-100 py-5 first:border-t">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl text-orange-800">{person.role === "Delivery Partner" ? "♧" : "♙"}</div><div><h2 className="font-extrabold">{person.name} <span className="text-xs font-normal text-slate-400">#{String(person.id).padStart(2,"0")}</span></h2><p className="text-sm text-slate-500">{person.phone}</p></div></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">{person.role}</span></div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-orange-50 p-3"><div><StatusPill status={person.status} /><p className="mt-1 text-xs text-slate-500">{person.detail}</p></div>{person.status === "Idle" && person.role === "Delivery Partner" && <button onClick={() => setStaff((old) => old.map((s) => s.id === person.id ? { ...s, status: "Active", detail: "Assigned by admin" } : s))} className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-orange-600">Assign</button>}</div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>★ {person.rating}　·　{person.delivered} Delivered Today</span><a href={`tel:${person.phone}`} className="rounded-full bg-orange-50 px-3 py-2 font-bold text-orange-700">☎ Call</a></div>
      </article>)}</div>
      {visible.length === 0 && <p className="border-y border-orange-100 py-8 text-center text-slate-500">No team members found.</p>}
    </AdminLayout>
  );
}
