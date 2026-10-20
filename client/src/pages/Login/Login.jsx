import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaBookOpen,
  FaComments,
  FaEnvelope,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaLock,
  FaShieldAlt,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const DEPARTMENTS = [
  { value: "CE", label: "Computer Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "AIDS", label: "AI & Data Science" },
  { value: "AIML", label: "AI & Machine Learning" },
  { value: "EXTC", label: "Electronics & Telecom" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "MCA", label: "MCA" },
  { value: "MBA", label: "MBA" },
  { value: "OTHER", label: "Other" },
];

const YEARS = [
  { value: "FY", label: "First Year" },
  { value: "SY", label: "Second Year" },
  { value: "TY", label: "Third Year" },
  { value: "Final", label: "Final Year" },
];

const FEATURES = [
  {
    icon: FaShieldAlt,
    title: "Verified student community",
    description: "Only college accounts get in, so every deal is with a real student.",
  },
  {
    icon: FaComments,
    title: "Chat with buyers & sellers",
    description: "Ask questions, negotiate and arrange a pickup on campus.",
  },
  {
    icon: FaShoppingBag,
    title: "List or find anything",
    description: "Books, gadgets, hostel gear and notes — all in one place.",
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

const selectClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg ${
          light
            ? "bg-white/15 ring-1 ring-inset ring-white/30 backdrop-blur"
            : "bg-gradient-to-br from-indigo-600 to-violet-600 shadow-indigo-500/30"
        }`}
      >
        <FaGraduationCap className="text-xl text-white" />
      </div>
      <div className="leading-none">
        <p
          className={`text-xl font-extrabold tracking-tight ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          CampusX
        </p>
        <p
          className={`mt-1 text-[11px] font-bold uppercase tracking-[0.22em] ${
            light ? "text-indigo-100" : "text-indigo-600"
          }`}
        >
          Market
        </p>
      </div>
    </div>
  );
}

function Field({ id, label, icon, action, below, children }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
        >
          {label}
        </label>
        {action}
      </div>
      <div className="relative mt-1.5">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        {children}
      </div>
      {below}
    </div>
  );
}

export default function Login({ initialSignUp = false }) {
  const navigate = useNavigate();
  const { login, register, handleGoogleLogin } = useContext(AuthContext);

  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("OTHER");
  const [year, setYear] = useState("FY");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleWidth, setGoogleWidth] = useState(() =>
    typeof window === "undefined"
      ? 280
      : Math.min(360, Math.max(200, window.innerWidth - 120))
  );

  useEffect(() => {
    const updateWidth = () => {
      setGoogleWidth(Math.min(360, Math.max(200, window.innerWidth - 120)));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await register({
          fullName: name,
          email,
          password,
          department,
          year,
        });

        toast.success("Registration successful. Please log in.");
        setIsSignUp(false);
        setPassword("");
        return;
      }

      await login({
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      const errorData = err.response?.data;

      const errorMessage =
        errorData?.errors?.[0]?.msg ||
        errorData?.message ||
        err.message ||
        "Authentication failed.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      await handleGoogleLogin(credentialResponse);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(
        err.response?.data?.message ||
          "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans">
      <aside className="relative hidden w-[46%] overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white lg:flex xl:w-1/2">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <Logo light />

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur">
              <FaShieldAlt className="text-emerald-300" />
              Verified students only
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight xl:text-5xl">
              Buy, sell &amp; trade across your campus.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-indigo-100">
              The trusted marketplace for MES students — textbooks, gadgets,
              hostel gear and more, all in one place.
            </p>

            <ul className="mt-9 space-y-5">
              {FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-indigo-100 ring-1 ring-inset ring-white/20 backdrop-blur">
                    <feature.icon className="text-base" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-indigo-100/80">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-indigo-100/80">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-inset ring-white/15">
              <FaBookOpen /> Books
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-inset ring-white/15">
              <FaShoppingBag /> Electronics
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-inset ring-white/15">
              <FaGraduationCap /> Notes
            </span>
            <span className="ml-auto hidden xl:inline">
              &copy; {new Date().getFullYear()} CampusX Market
            </span>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full min-w-0 max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div className="mb-7 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? "Join CampusX Market with your college email."
                : "Log in to continue to CampusX Market."}
            </p>
          </div>

          <div className="w-full min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  !isSignUp
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-bold transition ${
                  isSignUp
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Sign up
              </button>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700">
                <FaExclamationCircle className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Field id="name" label="Full name" icon={<FaUser />}>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
              )}

              <Field
                id="email"
                label="College email"
                icon={<FaEnvelope />}
                below={
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Use your college email, e.g. name@student.mes.ac.in
                  </p>
                }
              >
                <input
                  id="email"
                  type="email"
                  placeholder="you@student.mes.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field
                id="password"
                label="Password"
                icon={<FaLock />}
                action={
                  !isSignUp ? (
                    <Link
                      to="/forgot-password"
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot password?
                    </Link>
                  ) : null
                }
              >
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </Field>

              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="department"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className={`${selectClass} mt-1.5`}
                    >
                      {DEPARTMENTS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="year"
                      className="text-[11px] font-bold uppercase tracking-wider text-slate-500"
                    >
                      Year
                    </label>
                    <select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={`${selectClass} mt-1.5`}
                    >
                      {YEARS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/35 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Please wait...
                  </>
                ) : (
                  <>
                    {isSignUp ? "Create account" : "Login"}
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                or
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="flex w-full max-w-full justify-center overflow-hidden">
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={() => setError("Google Sign-In failed.")}
                useOneTap={false}
                shape="pill"
                theme="outline"
                size="large"
                text="continue_with"
                logo_alignment="center"
                width={googleWidth}
              />
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                  setError("");
                }}
                className="font-bold text-indigo-600 transition hover:text-indigo-700"
              >
                {isSignUp ? "Login" : "Sign up"}
              </button>
            </p>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
            <FaShieldAlt className="text-emerald-500" />
            Verified students only · Your privacy is our priority
          </p>
        </div>
      </main>
    </div>
  );
}
