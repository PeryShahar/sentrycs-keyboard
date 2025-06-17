import { useState } from "react";

const MAX_LENGTH = 5;

export function useWordGame() {
  const [letters, setLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<"neutral" | "success" | "error">(
    "neutral"
  );

  const addLetter = (char: string) => {
    if (letters.length < MAX_LENGTH) {
      setLetters([...letters, char]);
      setStatus("neutral");
    }
  };

  const removeLetter = () => {
    if (letters.length > 0) {
      setLetters(letters.slice(0, -1));
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

  return {
    letters,
    addLetter,
    removeLetter,
    submitWord,
    status,
  };
}
