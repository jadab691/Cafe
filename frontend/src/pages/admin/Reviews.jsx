import React from "react";
import AdminLayout from "./AdminLayout";
import { SectionTitle } from "../../components/admin/AdminControls";

// Dummy data for reviews
const demoReviews = [
  { id: "REV-101", customer: "Ayesha Siddiqua", rating: 5, date: "Today, 2:30 PM", comment: "The burger was amazing! Very fast delivery.", orderId: "#ORD-1042" },
  { id: "REV-102", customer: "Rahim Khan", rating: 4, date: "Today, 1:15 PM", comment: "Food was good, but the fries were a bit cold.", orderId: "#ORD-1038" },
  { id: "REV-103", customer: "Sadia Islam", rating: 2, date: "Yesterday, 8:00 PM", comment: "Missing the drink in my order. Please check.", orderId: "#ORD-1025" },
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

      <dl className="mb-8 grid grid-cols-1 gap-4 border-y border-orange-100 py-5 md:grid-cols-3">
        <div className="border-l-2 border-orange-200 pl-4">
          <dt className="text-sm font-semibold text-slate-500">Total Reviews</dt>
          <dd className="mt-2 text-3xl font-extrabold text-slate-900">128</dd>
        </div>
        <div className="border-l-2 border-orange-200 pl-4">
          <dt className="text-sm font-semibold text-slate-500">5-Star Reviews</dt>
          <dd className="mt-2 text-3xl font-extrabold text-slate-900">84</dd>
        </div>
        <div className="border-l-2 border-orange-200 pl-4">
          <dt className="text-sm font-semibold text-slate-500">Needs Attention</dt>
          <dd className="mt-2 text-3xl font-extrabold text-red-600">3</dd>
        </div>
      </dl>

      <section aria-labelledby="recent-feedback-heading">
        <h2 id="recent-feedback-heading" className="mb-4 text-lg font-extrabold text-slate-900">Recent Feedback</h2>
        <div className="divide-y divide-orange-100 border-y border-orange-100">
          {demoReviews.map((review) => (
            <article key={review.id} className="flex flex-col gap-3 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900">{review.customer}</p>
                  <p className="text-xs text-slate-500">{review.date} · Order {review.orderId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 text-lg">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 italic border-l-4 border-orange-200 pl-3">"{review.comment}"</p>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}