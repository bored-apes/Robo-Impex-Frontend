"use client";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Icon } from "@iconify/react";
import { CONTACT, SOCIAL } from "@/data/constants";
import { AnimatePresence } from "framer-motion";

type SocialLink = {
  name: string;
  icon: string;
  url: string;
  color: string;
};

interface TopBarProps {
  showTopBar: boolean;
}

export function TopBar({ showTopBar }: TopBarProps) {
  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: "mdi:instagram",
      url: SOCIAL.INSTAGRAM,
      color:
        "text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
    },
    {
      name: "Twitter",
      icon: "proicons:x-twitter",
      url: SOCIAL.TWITTER,
      color:
        "text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100",
    },
    {
      name: "YouTube",
      icon: "mdi:youtube",
      url: SOCIAL.YOUTUBE,
      color:
        "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
    },
  ];

  return (
    <AnimatePresence>
      {showTopBar && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 text-sm hidden lg:block backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-gradient-to-r bg-[#dfedf7] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#38b6ff]/3 via-transparent to-[#38b6ff]/3" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-1 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <motion.div
                  className="flex items-center space-x-2 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-[#38b6ff] dark:hover:text-[#38b6ff]"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <a
                    href={`tel:${CONTACT.PHONE}`}
                    className="font-medium text-xs lg:text-sm"
                  >
                    {CONTACT.PHONE}
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-[#38b6ff] dark:hover:text-[#38b6ff]"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <a
                    href={`mailto:${CONTACT.EMAIL}`}
                    className="font-medium text-xs lg:text-sm truncate"
                  >
                    {CONTACT.EMAIL}
                  </a>
                </motion.div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`${social.color} transition-all duration-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800`}
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={social.name}
                  >
                    <Icon
                      icon={social.icon}
                      className="h-3.5 w-3.5 lg:h-4 lg:w-4"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}