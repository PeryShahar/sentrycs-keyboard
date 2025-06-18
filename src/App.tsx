import { CharGrid } from "./components/CharGrid";
import { Keyboard } from "./components/Keyboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Word Input Game</h1>
      <CharGrid />
      <Keyboard />
    </div>
  );
}
