import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Foods", path: "/admin/manage-foods" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Delivery", path: "/admin/delivery" },
];

const orders = [
    { id: "#1001", customer: "Rahim", total: "৳450", status: "Pending" },
    { id: "#1002", customer: "Karim", total: "৳650", status: "Delivered" },
    { id: "#1003", customer: "Hasan", total: "৳300", status: "Preparing" },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-green-100 flex">

            {/* Sidebar */}
            <aside className="w-56 bg-yellow-100 border-r p-5">
                <h1 className="text-2xl font-bold mb-10">Cafe.</h1>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg text-sm ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl text-yellow-700 font-bold mb-4">Hello Cafe Owner , wellcome back!</h1>
                <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
                <p className="text-gray-500 mb-8">Welcome back, Admin.</p>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-2">120</h3>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-gray-500 text-sm">Total Foods</p>
                        <h3 className="text-2xl font-bold mt-2">35</h3>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-gray-500 text-sm">Total Customers</p>
                        <h3 className="text-2xl font-bold mt-2">85</h3>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg p-6">
                    <h3 className="font-semibold text-red-500 mb-5">Recent Orders</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-3">Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b last:border-0">
                                        <td className="py-4">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.total}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}