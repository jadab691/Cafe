import React from "react";
import AdminLayout from "./AdminLayout";
import { Panel, SectionTitle, StatusPill } from "./AdminUI";

// Dummy data for reviews
const demoReviews = [
  { id: "REV-101", customer: "Ayesha Siddiqua", rating: 5, date: "Today, 2:30 PM", comment: "The burger was amazing! Very fast delivery.", orderId: "#ORD-1042", status: "Published" },
  { id: "REV-102", customer: "Rahim Khan", rating: 4, date: "Today, 1:15 PM", comment: "Food was good, but the fries were a bit cold.", orderId: "#ORD-1038", status: "Published" },
  { id: "REV-103", customer: "Sadia Islam", rating: 2, date: "Yesterday, 8:00 PM", comment: "Missing the drink in my order. Please check.", orderId: "#ORD-1025", status: "Needs Attention" },
];

export default function Reviews() {
  return (
    <AdminLayout>
      <SectionTitle 
        eyebrow="Customer Feedback" 
        title="Reviews & Ratings" 
        description="Monitor customer satisfaction and resolve issues." 
        action={<span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">★ 4.6 Avg Rating</span>} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Reviews</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">128</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">5-Star Reviews</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">84</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Needs Attention</p>
          <p className="text-3xl font-extrabold text-red-600 mt-2">3</p>
        </div>
      </div>

      <Panel title="Recent Feedback">
        <div className="space-y-4 mt-2">
          {demoReviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900">{review.customer}</p>
                  <p className="text-xs text-slate-500">{review.date} · Order {review.orderId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-lg">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                  <StatusPill status={review.status === "Published" ? "Completed" : "Pending"} />
                </div>
              </div>
              <p className="text-sm text-slate-700 italic border-l-4 border-orange-200 pl-3">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </Panel>
    </AdminLayout>
  );
}