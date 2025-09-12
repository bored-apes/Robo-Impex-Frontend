"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedFooterSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons"

export function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ] as const

  return (
    <motion.footer className="bg-white/90 dark:bg-slate-900/90 from-muted/30 to-background border-t relative overflow-hidden px-4 md:px-8 lg:px-16">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 transition-opacity duration-500 `}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 transition-opacity duration-500`}
      />
     <AnimatedFooterSectionBackgroundIcons/>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/logo_transparent.png"
                alt="Robo Impex Logo"
                className="h-10 w-12 transition-all duration-300"
              />
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/80 bg-clip-text text-transparent">
                  Robo Impax
                </span>
                <div className="text-xs text-muted-foreground font-medium">Industrial Solutions</div>
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Leading B2B marketplace for industrial machinery, electronic components, and manufacturing solutions.
              Connecting businesses worldwide with quality suppliers.
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">Follow Us</h3>
              <div className="flex space-x-3">
                {[
                  { icon: "mdi:linkedin", href: "#", color: "hover:text-blue-600" },
                  { icon: "mdi:twitter", href: "#", color: "hover:text-blue-400" },
                  { icon: "mdi:facebook", href: "#", color: "hover:text-blue-700" },
                  { icon: "mdi:youtube", href: "#", color: "hover:text-red-600" },
                ].map((social, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover:bg-[#38b6ff]/10 transition-all duration-300 ${social.color}`}
                      asChild
                    >
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon icon={social.icon} className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 ml-6">
            <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
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

          <div className="space-y-4">
            <motion.div
              className="flex items-start space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="h-5 w-5 text-[#38b6ff] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                <div className="font-medium">105, Dhara Arcade</div>
                <div>Mota Varachha, Surat, Gujarat - 394101</div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-5 w-5 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                +91 77780 81772
              </span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-sm group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="h-5 w-5 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                info.roboimpex@gmail.com
              </span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 text-sm group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="h-5 w-5 text-[#38b6ff] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                Mon-Sat: 9AM-6PM IST
              </span>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#38b6ff]/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Robo Impax. All rights reserved.</p>
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
