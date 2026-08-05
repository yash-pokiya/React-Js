import React, { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export function EncryptedText({
  text,
  encryptedClassName = "",
  revealedClassName = "",
  revealDelayMs = 50,
  className = "",
}) {
  const [revealedChars, setRevealedChars] = useState(0);
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setRevealedChars((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return text.length;
        }
        return prev + 1;
      });

      setRandomText(
        Array(text.length)
          .fill("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join("")
      );
    }, revealDelayMs);

    return () => clearInterval(interval);
  }, [text, revealDelayMs]);

  if (revealedChars >= text.length) {
    return <span className={`${className} ${revealedClassName}`}>{text}</span>;
  }

  const revealedPart = text.slice(0, revealedChars);
  const encryptedPart = randomText.slice(revealedChars);

  return (
    <span className={className}>
      <span className={revealedClassName}>{revealedPart}</span>
      <span className={encryptedClassName}>{encryptedPart}</span>
    </span>
  );
}
