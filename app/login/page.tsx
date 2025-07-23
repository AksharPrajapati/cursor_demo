"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Add this useEffect to redirect authenticated users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/profile");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint =
        tab === "signin" ? "/api/auth/login" : "/api/auth/signup";
      const payload =
        tab === "signin" ? { email, password } : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/profile");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-950">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center items-center bg-neutral-950 text-white px-4 py-8 md:px-12 md:py-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg text-center md:text-left">
          Unlock the power of AI
        </h1>
        <p className="text-base md:text-lg opacity-80 mb-8 md:mb-12 font-medium drop-shadow text-center md:text-left">
          Chat with the smartest AI - Experience the power of AI with us
        </p>
        <div className="w-[220px] h-[220px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-950 flex items-center justify-center mb-6 md:mb-0">
          <Image
            src="/create-pic.webp"
            alt="AI Illustration"
            width={400}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-2 py-8 md:px-6 md:py-10">
        <div className="w-full max-w-md bg-gradient-to-br rounded-3xl p-4 md:p-10 relative">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 mb-2 flex items-center justify-center rounded-full bg-blue-600 shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  fill="#fff"
                />
              </svg>
            </div>
            <span className="font-bold text-xl md:text-2xl text-white tracking-tight">
              Brainwave
            </span>
          </div>

          <div className="flex mb-6 md:mb-8 gap-2 bg-black rounded-xl p-1">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 py-2 md:py-3 rounded-xl font-semibold transition-colors text-base md:text-lg ${
                tab === "signin"
                  ? "bg-neutral-800 text-white shadow-md"
                  : "bg-transparent text-neutral-400"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2 md:py-3 rounded-xl font-semibold transition-colors text-base md:text-lg ${
                tab === "signup"
                  ? "bg-neutral-800 text-white shadow-md"
                  : "bg-transparent text-neutral-400"
              }`}
            >
              Create account
            </button>
          </div>
          {/* Social Login (Sign in only) */}
          {tab === "signin" && (
            <>
              <button className="w-full py-2 md:py-3 bg-neutral-800 text-white rounded-xl mb-2 md:mb-3 font-semibold flex items-center justify-center gap-2 border border-neutral-700 hover:bg-neutral-700 transition-shadow shadow-sm text-sm md:text-base">
                <span className="text-xl">
                  {" "}
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <g>
                      <path
                        fill="#4285F4"
                        d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.4 0 4.7.7 6.6 2l6.4-6.4C33.2 5.1 28.8 3 24 3c-7.7 0-14.2 4.4-17.7 10.7z"
                      />
                      <path
                        fill="#34A853"
                        d="M6.3 14.7l7 5.1C15.1 17.1 18.3 15 22 15c2.4 0 4.7.7 6.6 2l6.4-6.4C33.2 5.1 28.8 3 24 3c-7.7 0-14.2 4.4-17.7 10.7z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M24 43c5.7 0 10.5-1.9 14-5.1l-6.5-5.3C29.9 34.9 27.1 36 24 36c-6.1 0-10.7-2.9-13.7-7.1l-7 5.4C7.8 41.1 15.3 43 24 43z"
                      />
                      <path
                        fill="#EA4335"
                        d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2.1l-7 5.4C15.3 41.1 19.4 43 24 43c7.7 0 14.2-4.4 17.7-10.7z"
                      />
                    </g>
                  </svg>
                </span>
                Continue with Google
              </button>
              <button className="w-full py-2 md:py-3 bg-neutral-800 text-white rounded-xl mb-4 md:mb-6 font-semibold flex items-center justify-center gap-2 border border-neutral-700 hover:bg-neutral-700 transition-shadow shadow-sm text-sm md:text-base">
                <span className="text-xl">
                  {" "}
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#fff"
                      d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07zM12.225 4.5h3.15v1.35h-3.15V4.5zm-2.07 0h1.35v1.35h-1.35V4.5zm-2.07 0h1.35v1.35h-1.35V4.5zm-2.07 0h1.35v1.35h-1.35V4.5zM12 6.75c-3.45 0-6.3 2.85-6.3 6.3s2.85 6.3 6.3 6.3 6.3-2.85 6.3-6.3-2.85-6.3-6.3-6.3zm0 10.8c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
                    />
                  </svg>
                </span>
                Continue with Apple
              </button>
            </>
          )}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {tab === "signup" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                className="w-full py-2 md:py-3 px-3 md:px-4 rounded-xl border border-neutral-700 bg-neutral-950 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm md:text-base"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full py-2 md:py-3 px-3 md:px-4 rounded-xl border border-neutral-700 bg-neutral-950 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm md:text-base"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className="w-full py-2 md:py-3 px-3 md:px-4 rounded-xl border border-neutral-700 bg-neutral-950 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm md:text-base pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-blue-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye open icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // Eye closed icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.671-2.634A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.306M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
            {tab === "signin" && (
              <div className="text-right mb-2">
                <a
                  href="#"
                  className="text-blue-400 text-xs md:text-sm hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            )}
            {error && (
              <div className="text-red-400 text-sm text-center mb-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 md:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base md:text-lg transition-colors shadow-lg mt-2"
            >
              {isLoading
                ? "Loading..."
                : tab === "signin"
                ? "Sign in with Brainwave"
                : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
