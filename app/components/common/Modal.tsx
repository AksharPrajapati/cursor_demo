import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  className = "",
}) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
