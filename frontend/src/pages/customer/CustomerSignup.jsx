import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();

  // Password strength requirements
  const passwordRules = [
    {
      label: "At least 6 characters",
      passed: password.length >= 6,
    },
    {
      label: "Uppercase letter (A-Z)",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter (a-z)",
      passed: /[a-z]/.test(password),
    },
    {
      label: "At least one number (0-9)",
      passed: /\d/.test(password),
    },
    {
      label: "Special character (!@#$...)",
      passed: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passedRules = passwordRules.filter(
    (rule) => rule.passed
  ).length;

  const strengthLabel =
    password.length === 0
      ? "Not entered"
      : passedRules <= 2
      ? "Weak"
      : passedRules <= 4
      ? "Medium"
      : "Strong";

  const strengthColor =
    password.length === 0
      ? "bg-gray-200"
      : passedRules <= 2
      ? "bg-red-500"
      : passedRules <= 4
      ? "bg-yellow-400"
      : "bg-green-500";

  const strengthTextColor =
    password.length === 0
      ? "text-gray-400"
      : passedRules <= 2
      ? "text-red-600"
      : passedRules <= 4
      ? "text-yellow-600"
      : "text-green-600";

  const showPasswordChecker =
    passwordFocused || password.length > 0;

  async function sendVerificationCode(e) {
    if (e) e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not start registration"
        );
      }

      setOtpSent(true);
      setSuccess(data.message);
    } catch (err) {
      setError(
        err.message || "Could not connect to the server"
      );
    } finally {
      setLoading(false);
    }
  }

  async function verifyEmail(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Email verification failed"
        );
      }

      setSuccess(
        data.message || "Email verified successfully!"
      );

      navigate("/customer/login", {
        state: { message: data.message },
      });
    } catch (err) {
      setError(
        err.message || "Could not verify your email"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate overflow-hidden bg-[#fffaf3] px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Same Food Theme As Login */}
        <section className="relative mx-auto w-full max-w-lg">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            FRESHLY PREPARED, ALWAYS
          </div>

          <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
            Good food.
            <br />
            Good <span className="text-orange-500">mood.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
            Your favorite flavors, freshly prepared.
            Discover something delicious and make every
            meal special.
          </p>

          {/* Food Illustration */}
          <div className="relative mt-10 flex min-h-[250px] items-center justify-center overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-100 via-[#fff0d8] to-rose-100 shadow-sm sm:min-h-[290px]">
            <div
              aria-hidden="true"
              className="absolute h-52 w-52 rounded-full border border-white/80 bg-white/40 shadow-inner sm:h-64 sm:w-64"
            />

            <div
              aria-hidden="true"
              className="absolute h-40 w-40 rounded-full border-[10px] border-white/80 bg-[#fffaf3] shadow-xl sm:h-48 sm:w-48"
            />

            <div className="relative z-10 -rotate-6 text-8xl drop-shadow-md transition duration-500 hover:rotate-0 sm:text-9xl">
              🍔
            </div>

            <div className="absolute right-[12%] top-[15%] rotate-12 rounded-2xl border border-white/80 bg-white/90 p-3 text-3xl shadow-lg sm:text-4xl">
              🍟
            </div>

            <div className="absolute bottom-[13%] left-[12%] -rotate-12 rounded-2xl border border-white/80 bg-white/90 p-3 text-3xl shadow-lg sm:text-4xl">
              🍕
            </div>

            <div className="absolute right-[12%] top-[67%] rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg sm:text-sm">
              Made with love ♥
            </div>

            <div className="absolute left-5 top-5 text-xs font-bold tracking-[0.2em] text-orange-800/60">
              CAFE • EST. WITH LOVE
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
              ✓ Fresh ingredients
            </span>

            <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
              ✓ Made to order
            </span>
          </div>
        </section>

        {/* Right: Signup Card */}
        <section className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-orange-100/80 bg-white p-6 shadow-[0_24px_80px_-24px_rgba(124,45,18,0.20)] sm:p-9">
            <div className="mb-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl text-white shadow-lg shadow-orange-200">
                {otpSent ? "✉️" : "🍽"}
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {otpSent ? "Verify Your Email" : "Create Account"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {otpSent
                  ? "Enter your verification code to complete registration."
                  : "Sign up to order your favorite food."}
              </p>
            </div>

            {!otpSent ? (
              <form
                onSubmit={sendVerificationCode}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  required
                />

                {/* Password and Strength Checker */}
                <div>
                  <input
                    type="password"
                    placeholder="Password (minimum 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    autoComplete="new-password"
                    aria-describedby={
                      showPasswordChecker
                        ? "password-strength-help"
                        : undefined
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    minLength={6}
                    required
                  />

                  {showPasswordChecker && (
                    <div
                      id="password-strength-help"
                      className="mt-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-700">
                          Password strength
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                            password.length === 0
                              ? "bg-gray-100 text-gray-500"
                              : passedRules <= 2
                              ? "bg-red-100 text-red-600"
                              : passedRules <= 4
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {strengthLabel}
                        </span>
                      </div>

                      <div className="mb-3 flex gap-1.5">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
                              password.length > 0 &&
                              index < passedRules
                                ? strengthColor
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mb-2 text-xs text-gray-500">
                        For a stronger password, include:
                      </p>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {passwordRules.map((rule) => (
                          <div
                            key={rule.label}
                            className={`flex items-center gap-2 text-xs ${
                              rule.passed
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                rule.passed
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {rule.passed ? "✓" : "•"}
                            </span>

                            <span>{rule.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    required
                  />

                  {confirmPassword.length > 0 && (
                    <p
                      className={`mt-2 text-xs font-medium ${
                        password === confirmPassword
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {password === confirmPassword
                        ? "✓ Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    role="status"
                    className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600"
                  >
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending Code..."
                    : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={verifyEmail}
                className="space-y-5"
              >
                <p className="text-sm leading-6 text-slate-600">
                  Enter the 6-digit verification code sent to{" "}
                  <strong className="break-all text-slate-800">
                    {email}
                  </strong>.
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-[#fffdf9] px-4 py-3.5 text-center text-lg tracking-[0.4em] text-slate-800 outline-none transition placeholder:text-slate-400 placeholder:tracking-normal focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  maxLength={6}
                  required
                />

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    role="status"
                    className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600"
                  >
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>

                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={loading}
                  className="w-full rounded-xl border border-orange-200 px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Resend Verification Code
                </button>
              </form>
            )}

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-100" />

              <span className="text-xs font-medium text-slate-400">
                GOOD FOOD AWAITS
              </span>

              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/customer/login"
                className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Made for food lovers, by Cafe.
          </p>
        </section>
      </div>
    </main>
  );
}