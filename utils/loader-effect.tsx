import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  fullPage?: boolean;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  fullPage = false,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-8 h-8 border-4",
    medium: "w-16 h-16 border-4",
    large: "w-24 h-24 border-8",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-t-transparent rounded-full animate-spin ${className}`}
      style={{ borderColor: "#9f0712", borderTopColor: "transparent" }}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};
