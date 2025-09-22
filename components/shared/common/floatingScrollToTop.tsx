"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export function FloatingScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-20 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >   
      <div className="relative">
        <div className="absolute inset-0 bg-[#38b6ff] rounded-full animate-ping opacity-20 dark:opacity-30"></div>
        <div className="absolute inset-0 bg-[#38b6ff] rounded-full animate-pulse opacity-30 dark:opacity-40"></div>

        <button
          onClick={scrollToTop}
          className="relative bg-gradient-to-br cursor-pointer from-[#38b6ff] to-[#2a8cc7] hover:from-[#2a8cc7] hover:to-[#1e6b9e] text-white rounded-full p-2 shadow-2xl hover:shadow-[#38b6ff]/25 transition-all duration-300 transform hover:scale-110 active:scale-95 group border-2 border-[#38b6ff]/20 dark:from-[#2a8cc7] dark:to-[#1e6b9e] dark:hover:from-[#38b6ff] dark:hover:to-[#2a8cc7]"
          aria-label="Scroll to top"
        >
          <Icon
            icon="mdi:arrow-up"
            className="w-7 h-7 group-hover:-translate-y-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
}