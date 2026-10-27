import { Navigate, useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("customerToken");
  let customer = null;
  const storedCustomer = localStorage.getItem("customer");

  if (storedCustomer) {
    try {
      customer = JSON.parse(storedCustomer);
    } catch {
      customer = null;
    }
  }

  if (!token || !customer?.name) {
    return <Navigate to="/customer/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    navigate("/");
  };

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Your Profile
        </h1>
        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-lg text-slate-900">{customer.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-lg text-slate-900">{customer.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-lg text-slate-900">{customer.phone}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
