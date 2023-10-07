import React, { useState, useEffect } from "react";

type TypingAnimationProps = {
  fullText: string;
  /** speed in milliseconds */
  speed?: number;
};

const TypingAnimation = ({ fullText, speed = 100 }: TypingAnimationProps) => {
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    let index = -1;
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      index++;
      setDisplayedContent((displayedContent) => {
        return displayedContent + fullText[index];
      });
      if (index >= fullText.length - 1) {
        clearInterval(animKey);
      }
    }, speed);
    return () => {
      clearInterval(animKey);
    };
  }, [fullText, speed]);

  return (
    <pre className="type-animation text-title text-big">{displayedContent}</pre>
  );
};

export default TypingAnimation;
