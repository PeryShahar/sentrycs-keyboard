import { CharGrid } from "./components/CharGrid";
import { Keyboard } from "./components/Keyboard";
import { useWordGame } from "./lib/hooks/useWordGame";

export default function App() {
  const { letters, addLetter, removeLetter, submitWord, status } =
    useWordGame();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Word Input Game</h1>
      <CharGrid letters={letters} status={status} />
      <Keyboard
        onChar={(c) => addLetter(c)}
        onBackspace={removeLetter}
        onEnter={submitWord}
      />
    </div>
  );
}
