
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 bg-yellow-100 text-gray-300">
            {/* Main Footer */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:py-16">

                {/* Brand */}
                <div>
                    <Link to="/" className="inline-flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
                            C
                        </span>
                        <span className="text-2xl font-bold tracking-tight text-gray-900">
                            Cafe<span className="text-orange-600">.</span>
                        </span>
                    </Link>

                    <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500">
                        Delicious food, freshly prepared and delivered to your door.
                        Discover your favorites and enjoy every bite with Cafe.
                    </p>

                    <div className="mt-5 flex gap-3">
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition hover:border-orange-500 hover:bg-orange-500 hover:text-blue-500"
                        >
                            f
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-sm font-bold transition hover:border-orange-500 hover:bg-orange-500 hover:text-white-300"
                        >
                            ig
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-gray-900">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li>
                            <Link
                                to="/"
                                className="transition hover:text-orange-400"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/menu"
                                className="transition hover:text-orange-400"
                            >
                                Our Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="transition hover:text-orange-400"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="transition hover:text-orange-400"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-gray-900">
                        Customer Support
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li>
                            <Link
                                to="/cart"
                                className="transition hover:text-orange-400"
                            >
                                My Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/my-orders"
                                className="transition hover:text-orange-400"
                            >
                                Track My Order
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="transition hover:text-orange-400"
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register/customer"
                                className="transition hover:text-orange-400"
                            >
                                Create Account
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-gray-900">
                        Get in Touch
                    </h3>

                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-start gap-3">
                            <span className="text-lg text-orange-500">⌖</span>
                            <span className="leading-6 text-gray-400">
                                Fresh food, delivered to your doorstep.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg text-orange-500">✉</span>
                            <a
                                href="mailto:support@cafe.com"
                                className="break-all transition hover:text-orange-400"
                            >
                                support@cafe.com
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg text-orange-500">◷</span>
                            <span className="leading-6 text-gray-400">
                                Order online and enjoy your favorite meals.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-gray-500 sm:px-6 md:flex-row lg:px-8">
                    <p>
                        © {currentYear} Cafe. All rights reserved.
                    </p>

                    <p>
                        Made with{" "}
                        <span className="text-red-500">♥</span>{" "}
                        for food lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
