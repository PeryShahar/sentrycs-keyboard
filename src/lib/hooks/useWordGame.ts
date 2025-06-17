import { useEffect, useState } from "react";
import eventBus from "../utils/EventBus";

const MAX_LENGTH = 5;

export function useWordGame() {
  const [letters, setLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<"neutral" | "success" | "error">(
    "neutral"
  );

  const addLetter = (char: string) => {
    if (letters.length < MAX_LENGTH) {
      setLetters((prev) => [...prev, char]);
      setStatus("neutral");
    }
  };

  const removeLetter = () => {
    if (letters.length > 0) {
      setLetters((prev) => prev.slice(0, -1));
      setStatus("neutral");
    }
  };

  const submitWord = async () => {
    if (letters.length < MAX_LENGTH) {
      setStatus("error");
      return;
    }

    const word = letters.join("").toLowerCase();

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    eventBus.registerListener("CHAR_TYPED", addLetter);
    eventBus.registerListener("BACKSPACE", () => removeLetter());
    eventBus.registerListener("ENTER", () => submitWord());

    return () => {
      eventBus.removeListener("CHAR_TYPED");
      eventBus.removeListener("BACKSPACE");
      eventBus.removeListener("ENTER");
    };
  }, [letters]);

  return {
    letters,
    addLetter,
    removeLetter,
    submitWord,
    status,
  };
}
