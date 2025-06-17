interface KeyboardProps {
  onChar: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

export const Keyboard: React.FC<KeyboardProps> = ({
  onChar,
  onBackspace,
  onEnter,
}) => {
  return (
    <div className="grid grid-cols-10 gap-2 justify-center max-w-md mx-auto">
      {keys.map((key) => (
        <button
          key={key}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
          onClick={() => onChar(key)}
        >
          {key}
        </button>
      ))}
      <button
        className="col-span-2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded"
        onClick={onBackspace}
      >
        Backspace
      </button>
      <button
        className="col-span-2 bg-blue-400 hover:bg-blue-500 p-2 rounded"
        onClick={onEnter}
      >
        Enter
      </button>
    </div>
  );
};
