import React from "react";

interface SidebarMenuItemProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  sidebarOpen: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  label,
  icon,
  selected,
  onClick,
  sidebarOpen,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full border-l-4
        ${
          selected
            ? "border-blue-500 bg-blue-500/10 shadow-md pl-8"
            : "border-transparent hover:bg-neutral-800/10 pl-4"
        }
        ${sidebarOpen ? "justify-start" : "justify-center"}
        ${selected ? "text-blue-600" : "text-neutral-300"}`}
      style={selected ? { fontWeight: 700 } : {}}
    >
      <span>{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </button>
  );
};

export default React.memo(SidebarMenuItem);
