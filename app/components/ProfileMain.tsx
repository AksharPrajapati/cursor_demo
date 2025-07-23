import React from "react";
import Image from "next/image";
import { User } from "@/lib/types";

interface ProfileMainProps {
  selected: string;
  user: User;
  theme: string;
  sidebarOpen: boolean;
}

const ProfileMain: React.FC<ProfileMainProps> = ({
  selected,
  user,
  theme,
  sidebarOpen,
}) => {
  return (
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
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
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
            <h2 className="text-2xl font-bold text-white mb-4">Transactions</h2>
            <div className="text-neutral-400">
              No transactions found. (Demo)
            </div>
          </div>
        )}
        {selected === "budget" && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Budget</h2>
            <div className="text-neutral-400">No budget data found. (Demo)</div>
          </div>
        )}
        {selected === "categories" && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Categories</h2>
            <div className="text-neutral-400">No categories found. (Demo)</div>
          </div>
        )}
        {selected === "statistics" && (
          <div className="w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
            <div className="text-neutral-400">Statistics page coming soon.</div>
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
  );
};

export default React.memo(ProfileMain);
