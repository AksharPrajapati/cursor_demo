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
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors w-full
        ${selected ? "bg-blue-500/10" : "hover:bg-neutral-800/10"}
        ${sidebarOpen ? "justify-start" : "justify-center"}
        ${selected ? "text-blue-600" : "text-neutral-300"}`}
      style={selected ? { fontWeight: 700 } : {}}
    >
      {/* Left accent bar for selected item */}
      {selected && (
        <span
          className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-blue-500"
          aria-hidden="true"
        />
      )}
      <span className="ml-1">{icon}</span>
      {sidebarOpen && <span className="ml-1">{label}</span>}
    </button>
  );
};

export default React.memo(SidebarMenuItem);
