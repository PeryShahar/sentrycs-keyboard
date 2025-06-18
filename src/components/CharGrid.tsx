import React from "react";
import { useWordGame } from "@/lib/hooks/useWordGame";
import { EventStatus } from "@/lib/types";

const borderColorMap: Record<EventStatus, string> = {
  [EventStatus.Success]: "border-green-500",
  [EventStatus.Error]: "border-red-500",
  [EventStatus.Neutral]: "border-gray-300",
};

export const CharGrid: React.FC = () => {
  const { letters, status } = useWordGame();
  const borderColor = borderColorMap[status as EventStatus];

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
