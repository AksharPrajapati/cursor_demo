"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const sidebarOptions = [
  {
    label: "Overview",
    value: "overview",
    color: "blue",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          fill="#2563eb"
          stroke="none"
        />
        <rect x="7" y="7" width="4" height="4" rx="1" fill="#fff" />
        <rect x="13" y="7" width="4" height="4" rx="1" fill="#fff" />
        <rect x="7" y="13" width="4" height="4" rx="1" fill="#fff" />
        <rect x="13" y="13" width="4" height="4" rx="1" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "Search",
    value: "search",
    color: "green",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" stroke="#22c55e" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="#22c55e" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Transactions",
    value: "transactions",
    color: "blue",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <path d="M8 12h8" stroke="#3b82f6" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Budget",
    value: "budget",
    color: "orange",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#f59e42"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#f59e42"
          strokeWidth="2"
        />
        <path d="M8 16l8-8" stroke="#f59e42" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Categories",
    value: "categories",
    color: "rose",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#f43f5e"
          strokeWidth="2"
        />
        <path d="M8 8h8v8H8z" fill="#f43f5e" />
      </svg>
    ),
  },
  {
    label: "Statistics",
    value: "statistics",
    color: "purple",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#a78bfa"
          strokeWidth="2"
        />
        <rect x="8" y="12" width="2" height="4" rx="1" fill="#a78bfa" />
        <rect x="11" y="10" width="2" height="6" rx="1" fill="#a78bfa" />
        <rect x="14" y="8" width="2" height="8" rx="1" fill="#a78bfa" />
      </svg>
    ),
  },
  {
    label: "Settings",
    value: "settings",
    color: "slate",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" />
        <path d="M12 8v4l3 3" stroke="#64748b" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Notes",
    value: "notes",
    color: "yellow",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          stroke="#fbbf24"
          strokeWidth="2"
        />
        <path d="M8 8h8v8H8z" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    label: "Sync",
    value: "sync",
    color: "cyan",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" />
        <path d="M8 12h8" stroke="#22d3ee" strokeWidth="2" />
      </svg>
    ),
  },
];

const colorMap = {
  blue: "border-blue-500 bg-blue-500/10",
  green: "border-green-500 bg-green-500/10",
  orange: "border-orange-500 bg-orange-500/10",
  rose: "border-rose-500 bg-rose-500/10",
  purple: "border-purple-500 bg-purple-500/10",
  slate: "border-slate-500 bg-slate-500/10",
  yellow: "border-yellow-500 bg-yellow-500/10",
  cyan: "border-cyan-500 bg-cyan-500/10",
};

const ProfilePage = () => {
  const [selected, setSelected] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState("dark");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          // Token invalid, redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-neutral-950 items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-neutral-950" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-6 left-6 z-20 flex flex-col justify-between rounded-3xl shadow-2xl ${
          theme === "dark"
            ? "bg-black border-neutral-800"
            : "bg-white border-gray-200"
        } border transition-all duration-200 ${
          sidebarOpen ? "w-72" : "w-20"
        } h-[92vh]`}
      >
        {/* Top: Logo and Expand/Collapse */}
        <div className="flex flex-col items-center pt-6 px-4 gap-4 w-full">
          {/* Logo and Expand/Collapse */}
          {sidebarOpen ? (
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <span
                  className={`font-bold text-2xl tracking-tight ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Brainwave
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className={`text-neutral-400 hover:text-white p-2 rounded-full transition-colors ml-2 ${
                  theme === "dark" ? "" : "hover:text-gray-900"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 12H5" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                  theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className={`text-neutral-400 hover:text-white p-2 rounded-full transition-colors ${
                  theme === "dark" ? "" : "hover:text-gray-900"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
          {/* Menu */}
          <nav className="flex flex-col gap-1 w-full mt-4">
            {sidebarOptions.map((opt) => (
              <div key={opt.value} className="relative group">
                <button
                  onClick={() => setSelected(opt.value)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-colors text-base w-full ${
                    selected === opt.value
                      ? `${
                          colorMap[opt.color as keyof typeof colorMap]
                        } border-l-4`
                      : "hover:bg-neutral-800"
                  } ${
                    sidebarOpen ? "justify-start" : "justify-center"
                  } text-neutral-300 ${
                    selected === opt.value ? "!text-blue-500" : ""
                  }`}
                  title={opt.label}
                  style={
                    selected === opt.value
                      ? {
                          borderColor: "#2563eb",
                          backgroundColor: "rgba(37,99,235,0.08)",
                        }
                      : {}
                  }
                >
                  {opt.icon}
                  {sidebarOpen && <span>{opt.label}</span>}
                </button>
                {!sidebarOpen && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg z-50 whitespace-nowrap">
                    {opt.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
        {/* Profile and Theme Section */}
        <div className="flex flex-col items-center gap-4 px-4 pb-6 w-full">
          <div className="flex flex-col items-center w-full mb-2">
            <div
              className={`w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg flex items-center justify-center mb-2 ${
                theme === "dark"
                  ? "bg-neutral-800 border-blue-600"
                  : "bg-gray-200 border-blue-500"
              }`}
            >
              <Image
                src="/file.svg"
                alt="Profile"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            {sidebarOpen ? (
              <>
                <span
                  className={`text-base font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </span>
                <span
                  className={`text-xs mb-2 ${
                    theme === "dark" ? "text-neutral-400" : "text-gray-500"
                  }`}
                >
                  {user.email}
                </span>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className={`w-full py-2 border border-red-600 ${
                    theme === "dark"
                      ? "bg-red-600/10 text-red-600 hover:bg-red-600/20"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  } rounded-xl font-semibold transition-colors mb-2`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className={`flex items-center justify-center w-10 h-10 border border-red-600 ${
                  theme === "dark"
                    ? "bg-red-600/10 text-red-600 hover:bg-red-600/20"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                } rounded-xl font-semibold transition-colors mb-2`}
                title="Logout"
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
                </svg>
              </button>
            )}
          </div>
          {/* Theme Toggle */}
          {sidebarOpen ? (
            <div className="w-full flex justify-center mt-2 px-2">
              <div className="relative flex rounded-xl bg-neutral-800 dark:bg-neutral-800 border border-neutral-700 w-full h-12 items-center shadow-inner overflow-hidden px-2">
                {/* Animated highlight */}
                <button
                  onClick={() => setTheme("light")}
                  className={`relative z-10 flex items-center justify-center gap-2 w-[calc(50%-8px)] h-10 rounded-lg transition-colors duration-200 font-medium ml-0 ${
                    theme === "light"
                      ? "text-blue-600 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path
                      d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`relative z-10 flex items-center justify-center gap-2 w-[calc(50%-8px)] h-10 rounded-lg transition-colors duration-200 font-medium mr-0 ${
                    theme === "dark"
                      ? "text-blue-400 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Dark</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mt-2">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center w-10 h-10 rounded-xl border border-blue-500 ${
                  theme === "light"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-neutral-200 text-blue-500"
                }`}
                title="Light mode"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center w-10 h-10 rounded-xl border border-blue-500 ${
                  theme === "dark"
                    ? "bg-blue-900 text-blue-300"
                    : "bg-neutral-800 text-neutral-400"
                }`}
                title="Dark mode"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div
              className={`rounded-2xl shadow-2xl p-10 md:p-14 flex flex-col items-center min-w-[340px] md:min-w-[420px] ${
                theme === "dark" ? "bg-neutral-900" : "bg-white"
              }`}
            >
              <svg
                width="56"
                height="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="mb-6 text-red-500"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
              </svg>
              <h2
                className={`text-3xl font-bold mb-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Confirm Logout
              </h2>
              <p
                className={`mb-8 text-center ${
                  theme === "dark" ? "text-neutral-400" : "text-gray-500"
                }`}
              >
                Are you sure you want to logout?
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className={`px-8 py-3 rounded-xl border border-blue-500 ${
                    theme === "dark"
                      ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  } font-semibold text-lg`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className={`px-8 py-3 rounded-xl border border-red-600 ${
                    theme === "dark"
                      ? "bg-red-600/10 text-red-600 hover:bg-red-600/20"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  } font-semibold text-lg`}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col items-center justify-center p-4 md:p-12 ml-0 ${
          sidebarOpen ? "md:ml-[320px]" : "md:ml-[104px]"
        }`}
      >
        <div
          className={`w-full max-w-2xl rounded-3xl shadow-2xl border p-8 md:p-12 flex flex-col items-center ${
            theme === "dark"
              ? "bg-black border-neutral-800"
              : "bg-white border-gray-200"
          }`}
        >
          {selected === "overview" && (
            <>
              <div className="w-28 h-28 rounded-full overflow-hidden bg-neutral-800 border-4 border-blue-600 shadow-lg mb-4 flex items-center justify-center">
                <Image
                  src="/file.svg"
                  alt="Profile"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <p className="text-neutral-400 mb-4">{user.email}</p>
              <p className="text-neutral-300 text-center">
                Welcome to your profile! Here you can manage your account, view
                your projects, and more.
              </p>
            </>
          )}
          {selected === "search" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Search</h2>
              <div className="text-neutral-400">
                Search functionality coming soon.
              </div>
            </div>
          )}
          {selected === "transactions" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">
                Transactions
              </h2>
              <div className="text-neutral-400">
                No transactions found. (Demo)
              </div>
            </div>
          )}
          {selected === "budget" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Budget</h2>
              <div className="text-neutral-400">
                No budget data found. (Demo)
              </div>
            </div>
          )}
          {selected === "categories" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Categories</h2>
              <div className="text-neutral-400">
                No categories found. (Demo)
              </div>
            </div>
          )}
          {selected === "statistics" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
              <div className="text-neutral-400">
                Statistics page coming soon.
              </div>
            </div>
          )}
          {selected === "settings" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
              <div className="text-neutral-400">Settings page coming soon.</div>
            </div>
          )}
          {selected === "notes" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Notes</h2>
              <div className="text-neutral-400">No notes found. (Demo)</div>
            </div>
          )}
          {selected === "sync" && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Sync</h2>
              <div className="text-neutral-400">No sync data found. (Demo)</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
