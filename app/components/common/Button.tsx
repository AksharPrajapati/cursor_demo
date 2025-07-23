import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const base =
  "py-2 px-4 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => (
  <button
    className={`${base} ${variants[variant]}${
      fullWidth ? " w-full" : ""
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default React.memo(Button);
