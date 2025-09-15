"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedFooterSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons"
import { CONTACT, SOCIAL, NAVIGATION } from "@/data/constants"

export function Footer() {
  return (
    <motion.footer className="bg-white/90 dark:bg-slate-900/90 from-muted/30 to-background border-t relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 transition-opacity duration-500 `}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 transition-opacity duration-500`}
      />
      <AnimatedFooterSectionBackgroundIcons />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/logo_transparent.png"
                alt="Robo Impex Logo"
                className="h-8 w-10 sm:h-10 sm:w-12 transition-all duration-300"
              />
              <div>
                <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/80 bg-clip-text text-transparent">
                  Robo Impex
                </span>
                <div className="text-xs text-muted-foreground font-medium">Industrial Solutions</div>
              </div>
            </Link>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Leading B2B marketplace for industrial machinery, electronic components, and manufacturing solutions.
              Connecting businesses worldwide with quality suppliers.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg text-foreground">Follow Us</h3>
              <div className="flex space-x-2 sm:space-x-3">
                {[
                  { icon: "mdi:linkedin", href: SOCIAL.LINKEDIN, color: "hover:text-blue-600" },
                  { icon: "mdi:twitter", href: SOCIAL.TWITTER, color: "hover:text-blue-400" },
                  { icon: "mdi:facebook", href: SOCIAL.FACEBOOK, color: "hover:text-blue-700" },
                  { icon: "mdi:youtube", href: SOCIAL.YOUTUBE, color: "hover:text-red-600" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-[#38b6ff]/10 transition-all duration-300 ${social.color} h-8 w-8 sm:h-10 sm:w-10`}
                      asChild
                    >
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon icon={social.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 md:ml-0 lg:ml-6">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAVIGATION.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-[#38b6ff] transition-all duration-300 hover:translate-x-1 inline-block group"
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

          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Contact Info</h3>

            <motion.div
              className="flex items-start space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="text-muted-foreground group-hover:text-foreground transition-colors min-w-0">
                <div className="font-medium text-sm sm:text-base">{CONTACT.ADDRESS.split(",")[0]}</div>
                <div className="text-xs sm:text-sm break-words">
                  {CONTACT.ADDRESS.split(",").slice(1).join(",").trim()}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a
                href={`tel:${CONTACT.PHONE}`}
                className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-sm sm:text-base"
              >
                {CONTACT.PHONE}
              </a>
            </motion.div>

            <motion.div
              className="flex items-start space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-sm sm:text-base break-all min-w-0"
              >
                {CONTACT.EMAIL}
              </a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-sm group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium text-sm sm:text-base">
                {CONTACT.BUSINESS_HOURS}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#38b6ff]/20 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              <p>© {new Date().getFullYear()} Robo Impex. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-[#38b6ff] transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-[#38b6ff] transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
