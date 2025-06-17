import React from "react";

interface CharGridProps {
  letters: string[];
  status: "neutral" | "success" | "error";
}

const getBorderColor = (status: CharGridProps["status"]) => {
  switch (status) {
    case "success":
      return "border-green-500";
    case "error":
      return "border-red-500";
    default:
      return "border-gray-300";
  }
};

export const CharGrid: React.FC<CharGridProps> = ({ letters, status }) => {
  const borderColor = getBorderColor(status);
  return (
    <div className="flex space-x-2 justify-center my-4">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-12 h-12 flex items-center justify-center text-xl font-bold border-2 ${borderColor} rounded`}
        >
          {letters[i] || ""}
        </div>
      ))}
    </div>
  );
};
