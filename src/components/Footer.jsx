import React, { useEffect, useState } from "react";

export const Footer = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    const timerIn = setTimeout(()=> {
      setIsVisible(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer
      className={`text-center py-3 ${isVisible ? "fade-in" : "fade-out"}`}
      style={{
        fontSize: "0.8rem",
        position: "relative",
        bottom: "0",
        width: "100%",
        transition: "opacity 1s ease-out",
      }}
    >
      <p>
        App developed by{" "}
        <a
          href="https://github.com/georgdronov"
          target="_blank"
          rel="noopener noreferrer"
          className="text-success"
        >
          georgdronov
        </a>
      </p>
    </footer>
  );
};
