"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileMain from "../components/ProfileMain";
import LogoutModal from "../components/LogoutModal";

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
      setLoading(false);
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

  // Sidebar options and color map
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

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-neutral-950" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      <ProfileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selected={selected}
        setSelected={setSelected}
        theme={theme}
        setTheme={setTheme}
        user={user}
        setShowLogoutModal={setShowLogoutModal}
        sidebarOptions={sidebarOptions}
        colorMap={colorMap}
      />
      <ProfileMain
        selected={selected}
        user={user}
        theme={theme}
        sidebarOpen={sidebarOpen}
      />
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default ProfilePage;
