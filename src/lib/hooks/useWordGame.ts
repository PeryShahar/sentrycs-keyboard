import { useEffect, useState, useCallback } from "react";
import { EventStatus } from "@/components/CharGrid";
import eventBus from "../utils/EventBus";

const MAX_LENGTH = 5;

export function useWordGame() {
  const [letters, setLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<EventStatus>(EventStatus.Neutral);

  const addLetter = useCallback((char: string) => {
    setLetters((prev) => {
      if (prev.length < MAX_LENGTH) {
        setStatus(EventStatus.Neutral);
        return [...prev, char];
      }
      return prev;
    });
  }, []);

  const removeLetter = useCallback(() => {
    setLetters((prev) => {
      if (prev.length > 0) {
        setStatus(EventStatus.Neutral);
        return prev.slice(0, -1);
      }
      return prev;
    });
  }, []);

  const submitWord = useCallback(async () => {
    setLetters((prev) => {
      if (prev.length < MAX_LENGTH) {
        setStatus(EventStatus.Error);
        return prev;
      }

      const word = prev.join("").toLowerCase();

      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
          if (res.ok) {
            setStatus(EventStatus.Success);
          } else {
            setStatus(EventStatus.Error);
          }
        })
        .catch(() => {
          setStatus(EventStatus.Error);
        });

      return prev;
    });
  }, []);

  useEffect(() => {
    eventBus.registerListener("CHAR_TYPED", addLetter);
    eventBus.registerListener("BACKSPACE", removeLetter);
    eventBus.registerListener("ENTER", submitWord);

    return () => {
      eventBus.removeListener("CHAR_TYPED");
      eventBus.removeListener("BACKSPACE");
      eventBus.removeListener("ENTER");
    };
  }, [addLetter, removeLetter, submitWord]);

  return {
    letters,
    addLetter,
    removeLetter,
    submitWord,
    status,
  };
}
