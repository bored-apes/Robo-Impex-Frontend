"use client";

import { Icon } from "@iconify/react";
import { SOCIAL } from "@/data/constants";

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    window.open(SOCIAL.WHATSAPP, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30"></div>

        <button
          onClick={handleWhatsAppClick}
          className="relative bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full p-2 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95 group border-2 border-green-300/20 cursor-pointer"
          aria-label="Contact us on WhatsApp"
        >
          <Icon
            icon="mdi:whatsapp"
            className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
}
