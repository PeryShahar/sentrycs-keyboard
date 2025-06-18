import React from "react";

export enum EventStatus {
  Neutral = "neutral",
  Success = "success",
  Error = "error",
}

interface CharGridProps {
  letters: string[];
  status: EventStatus;
}

const borderColorMap: Record<EventStatus, string> = {
  [EventStatus.Success]: "border-green-500",
  [EventStatus.Error]: "border-red-500",
  [EventStatus.Neutral]: "border-gray-300",
};

export const CharGrid: React.FC<CharGridProps> = ({ letters, status }) => {
  const borderColor = borderColorMap[status];

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
