import React from "react";
import eventBus from "@/lib/utils/EventBus";

const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

export const Keyboard: React.FC = () => {
  return (
    <div className="grid grid-cols-10 gap-2 justify-center max-w-md mx-auto">
      {keys.map((key) => (
        <button
          key={key}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          onClick={() => eventBus.emit("CHAR_TYPED", key)}
        >
          {key}
        </button>
      ))}

      <button
        className="col-span-2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-center text-sm"
        onClick={() => eventBus.emit("BACKSPACE", null)}
      >
        Backspace
      </button>

      <button
        className="col-span-2 bg-blue-400 hover:bg-blue-500 p-2 rounded"
        onClick={() => eventBus.emit("ENTER", null)}
      >
        Enter
      </button>
    </div>
  );
};
