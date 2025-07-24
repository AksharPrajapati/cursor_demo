import React from "react";
import Image from "next/image";
import SidebarMenuItem from "./common/SidebarMenuItem";

interface SidebarOption {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
}

interface ProfileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selected: string;
  setSelected: (value: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  user: User;
  setShowLogoutModal: (show: boolean) => void;
  sidebarOptions: SidebarOption[];
  colorMap: Record<string, string>;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  selected,
  setSelected,
  theme,
  setTheme,
  user,
  setShowLogoutModal,
  sidebarOptions,
  colorMap,
}) => {
  return (
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
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`text-neutral-400 hover:text-white p-2 rounded-full transition-colors ml-2 ${
                theme === "dark" ? "" : "hover:text-gray-900"
              }`}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5" />
                <path d="M12 5l-7 7 7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`text-neutral-400 hover:text-white p-2 rounded-full transition-colors ${
              theme === "dark" ? "" : "hover:text-gray-900"
            }`}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      {/* Sidebar Options */}
      <nav className="flex-1 flex flex-col gap-2 mt-4 w-full">
        {sidebarOptions.map((option) => (
          <SidebarMenuItem
            key={option.value}
            label={option.label}
            icon={option.icon}
            selected={selected === option.value}
            onClick={() => setSelected(option.value)}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </nav>
      {/* User Info and Theme Toggle */}
      <div className="flex flex-col items-center gap-4 px-4 pb-6 w-full">
        {sidebarOpen ? (
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
            <span
              className={`text-base font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {user?.name}
            </span>
            <span
              className={`text-xs mb-2 ${
                theme === "dark" ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              {user?.email}
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
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Profile Icon */}
            <button
              aria-label="Profile"
              className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-lg flex items-center justify-center transition-colors ${
                theme === "dark"
                  ? "bg-neutral-800 border-blue-600"
                  : "bg-gray-200 border-blue-500"
              }`}
              tabIndex={0}
            >
              <Image
                src="/file.svg"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </button>
            {/* Logout Icon */}
            <button
              aria-label="Logout"
              onClick={() => setShowLogoutModal(true)}
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors border-red-600 shadow-lg ${
                theme === "dark"
                  ? "bg-red-600/10 text-red-600 hover:bg-red-600/20"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
              tabIndex={0}
            >
              {/* Logout SVG */}
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 17l5-5-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* Theme Toggle Icon */}
            <button
              aria-label={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors shadow-lg ${
                theme === "dark"
                  ? "bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
                  : "bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300"
              }`}
              tabIndex={0}
            >
              {theme === "dark" ? (
                // Sun icon
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon icon
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                </svg>
              )}
            </button>
          </div>
        )}
        {sidebarOpen && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-full py-2 rounded-xl font-semibold transition-colors ${
              theme === "dark"
                ? "bg-neutral-800 text-white hover:bg-neutral-700"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        )}
      </div>
    </aside>
  );
};

export default React.memo(ProfileSidebar);
