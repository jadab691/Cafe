export function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function StatusPill({ status }) {
  const styles = {
    Pending: "bg-orange-100 text-orange-800",
    Cooking: "bg-amber-100 text-amber-800",
    Ready: "bg-emerald-100 text-emerald-800",
    "On Delivery": "bg-blue-100 text-blue-800",
    Delivered: "bg-slate-100 text-slate-700",
    "Claim Open": "bg-orange-100 text-orange-800",
    Active: "bg-emerald-100 text-emerald-800",
    Idle: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function SearchBox({ value, onChange, placeholder = "Search..." }) {
  return (
    <label className="flex min-w-0 items-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2.5">
      <span className="text-lg text-slate-400" aria-hidden="true">
        ⌕
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </label>
  );
}
