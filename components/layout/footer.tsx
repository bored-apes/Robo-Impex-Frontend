"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedFooterSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons";
import { CONTACT, SOCIAL, NAVIGATION } from "@/data/constants";
import { useTheme } from "@/components/theme-provider";

export function Footer() {
  const { theme } = useTheme();

  const logoPath = theme === "dark" ? "/logos/logo_3.png" : "/logos/logo_3.png";

  const logoDimensions = {
    notScrolled: {
      height: "h-8",
      width: "w-34",
      smHeight: "sm:h-10",
      smWidth: "sm:w-40",
    },
    scrolled: {
      height: "h-8",
      width: "w-32",
      smHeight: "sm:h-10",
      smWidth: "sm:w-38",
    },
    mobile: { height: "h-8", width: "w-40", smHeight: "sm:h-8", smWidth: "sm:w-44" },
  };
  
  return (
    <motion.footer className="bg-white/90 dark:bg-slate-900/90 from-muted/30 to-background border-t relative overflow-hidden w-full">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 transition-opacity duration-500 w-full`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 transition-opacity duration-500 w-full`}
      />
      <AnimatedFooterSectionBackgroundIcons />

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10 w-full">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 w-full">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0 w-full"
            >
              <motion.img
                src={logoPath}
                alt="Robo Impex Logo"
                className={`transition-all duration-300 ${logoDimensions.mobile.height} ${logoDimensions.mobile.width} ${logoDimensions.mobile.smHeight} ${logoDimensions.mobile.smWidth} sm:max-w-[150px] max-w-[120px] w-full`}
                whileHover={{ rotate: 5 }}
              />
            </Link>

            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed w-full">
              Leading B2B marketplace for industrial machinery, electronic components, and manufacturing solutions. Connecting businesses worldwide with quality suppliers.
            </p>

            <div className="space-y-3 sm:space-y-4 w-full">
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground w-full">
                Follow Us
              </h3>
              <div className="flex space-x-2 sm:space-x-3 w-full justify-start">
                {[
                  {
                    icon: "proicons:x-twitter",
                    href: SOCIAL.TWITTER,
                    color: "hover:text-gray-800 dark:hover:text-gray-200",
                  },
                  {
                    icon: "mdi:instagram",
                    href: SOCIAL.INSTAGRAM,
                    color: "hover:text-pink-600",
                  },
                  {
                    icon: "mdi:youtube",
                    href: SOCIAL.YOUTUBE,
                    color: "hover:text-red-600",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-auto"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-[#38b6ff]/10 transition-all duration-300 ${social.color} h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12`}
                      asChild
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          icon={social.icon}
                          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                        />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 w-full">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground w-full">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 w-full">
              {NAVIGATION.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-[#38b6ff] transition-all duration-300 hover:translate-x-1 inline-block group w-full"
                  >
                    {item.name}
                    <motion.span
                      className="block h-0.5 bg-[#38b6ff] mt-1"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4 w-full">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground w-full">
              Contact Info
            </h3>

            <motion.div
              className="flex items-start space-x-3 text-xs sm:text-sm md:text-base group cursor-pointer w-full"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#38b6ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="text-muted-foreground group-hover:text-foreground transition-colors min-w-0 w-full">
                <div className="font-medium text-xs sm:text-sm md:text-base w-full">
                  {CONTACT.ADDRESS}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-xs sm:text-sm md:text-base group cursor-pointer w-full"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a
                href={`tel:${CONTACT.PHONE}`}
                className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-xs sm:text-sm md:text-base w-full"
              >
                {CONTACT.PHONE}
              </a>
            </motion.div>

            <motion.div
              className="flex items-start space-x-3 text-xs sm:text-sm md:text-base group cursor-pointer w-full"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#38b6ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-xs sm:text-sm md:text-base break-all min-w-0 w-full"
              >
                {CONTACT.EMAIL}
              </a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-xs sm:text-sm md:text-base group w-full"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-xs sm:text-sm md:text-base w-full">
                {CONTACT.BUSINESS_HOURS}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#38b6ff]/20 pt-4 sm:pt-6 md:pt-8 w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm md:text-base text-muted-foreground text-center sm:text-left w-full">
            <p className="w-full text-center sm:text-left">
              © {new Date().getFullYear()} Robo Impex. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
              <Link
                href="/privacy"
                className="hover:text-[#38b6ff] transition-colors w-full sm:w-auto text-center sm:text-left"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#38b6ff] transition-colors w-full sm:w-auto text-center sm:text-left"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
