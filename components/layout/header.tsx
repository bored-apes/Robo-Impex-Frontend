"use client"
import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import type { ReactElement } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Menu, Search, Zap, LogIn, Phone, Mail } from "lucide-react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { cartStorage, wishlistStorage } from "@/lib/utils/storage"
import { motion, AnimatePresence } from "framer-motion"
import { CONTACT, SOCIAL, NAVIGATION } from "@/data/constants"

type SocialLink = {
  name: string
  icon: string
  url: string
  color: string
}

export function Header() {
  const { theme } = useTheme()
  const [cartCount, setCartCount] = useState<number>(0)
  const [wishlistCount, setWishlistCount] = useState<number>(0)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false)
  const [showTopBar, setShowTopBar] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [arrowDirection, setArrowDirection] = useState<string>("")
  const [isInteracting, setIsInteracting] = useState<boolean>(false)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      angle: number
      opacity: number
    }>
  >([])
  const [floatingObjects, setFloatingObjects] = useState<
    Array<{
      id: number
      x: number
      y: number
      icon: string
      size: number
      rotation: number
      speed: number
      opacity: number
    }>
  >([])
  const headerRef = useRef<HTMLDivElement>(null)

  const electronicsIcons = [
    "mdi:chip",
    "mdi:developer-board",
    "mdi:memory",
    "mdi:resistor",
    "mdi:led-outline",
    "mdi:radar",
    "mdi:wifi",
    "mdi:bluetooth",
    "mdi:usb",
    "mdi:battery",
    "mdi:flash",
    "mdi:cog",
  ]

  // const logoPath = theme === "dark" ? "/logos/logo_transparent.png" : "/logos/logo_Light.png"
    const logoPath = theme === "dark" ? "/logos/logo_transparent.png" : "/logos/logo_transparent.png"

  const logoDimensions = {
    notScrolled: {
      height: "h-12",
      width: "w-14",
      smHeight: "sm:h-14",
      smWidth: "sm:w-16",
    },
    scrolled: {
      height: "h-10",
      width: "w-12",
      smHeight: "sm:h-12",
      smWidth: "sm:w-14",
    },
    mobile: { height: "h-12", width: "w-14" },
  }

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      speed: Math.random() * 0.2 + 0.05,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setParticles(newParticles)

    const newFloatingObjects = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: electronicsIcons[Math.floor(Math.random() * electronicsIcons.length)],
      size: Math.random() * 4 + 6,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.25 + 0.08,
    }))
    setFloatingObjects(newFloatingObjects)
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (headerRef.current && !isScrolled) {
        const now = Date.now()
        if (now - (handleMouseMove as any).lastCall < 32) return 
        ;(handleMouseMove as any).lastCall = now

        const rect = headerRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    },
    [isScrolled]
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) || isScrolled) return

      event.preventDefault()
      setIsInteracting(true)
      setArrowDirection(event.key.replace("Arrow", "").toLowerCase())

      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          speed: particle.speed * 2,
          angle: particle.angle + (Math.random() - 0.5) * Math.PI * 0.5,
          opacity: Math.min(0.8, particle.opacity * 1.5),
        }))
      )

      setFloatingObjects((prev) =>
        prev.map((obj) => ({
          ...obj,
          rotation: obj.rotation + (Math.random() - 0.5) * 30,
          size: obj.size * 1.3,
          opacity: Math.min(0.7, obj.opacity * 1.5),
        }))
      )

      setTimeout(() => {
        setIsInteracting(false)
        setArrowDirection("")
        setParticles((prev) =>
          prev.map((particle) => ({
            ...particle,
            speed: particle.speed * 0.5,
            opacity: particle.opacity * 0.8,
          }))
        )
        setFloatingObjects((prev) =>
          prev.map((obj) => ({
            ...obj,
            size: obj.size * 0.77,
            opacity: obj.opacity * 0.7,
          }))
        )
      }, 1000)
    },
    [isScrolled]
  )

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(cartStorage.getItemCount())
      setWishlistCount(wishlistStorage.getItems().length)
    }

    updateCounts()

    const handleStorageChange = () => updateCounts()
    window.addEventListener("storage", handleStorageChange)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsScrolled(currentScrollY > 0)

          if (currentScrollY === 0) {
            setShowTopBar(true)
          } else {
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
              setShowTopBar(false)
            } else if (currentScrollY < lastScrollY || currentScrollY <= 80) {
              setShowTopBar(true)
            }
          }
          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [lastScrollY, handleKeyPress, handleMouseMove])

  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: "mdi:instagram",
      url: SOCIAL.INSTAGRAM,
      color: "text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
    },
    {
      name: "Twitter",
      icon: "proicons:x-twitter",
      url: SOCIAL.TWITTER,
      color: "text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100",
    },
    {
      name: "YouTube",
      icon: "mdi:youtube",
      url: SOCIAL.YOUTUBE,
      color: "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
    },
  ]

  return (
    <>
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
                    <a href={`tel:${CONTACT.PHONE}`} className="font-medium text-xs lg:text-sm">
                      {CONTACT.PHONE}
                    </a>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-[#38b6ff] dark:hover:text-[#38b6ff]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                    <a href={`mailto:${CONTACT.EMAIL}`} className="font-medium text-xs lg:text-sm truncate">
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
                      <Icon icon={social.icon} className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`sticky top-0 z-50 w-full overflow-hidden ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/60 dark:border-slate-700/60 shadow-lg backdrop-blur-xl transition-all duration-100"
            : "bg-transparent border-b border-transparent backdrop-blur-md transition-all duration-100"
        }`}
      >
        {!isScrolled && (
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/5">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern
                    id="headerMesh"
                    x={mousePosition.x * 0.2}
                    y={mousePosition.y * 0.2}
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isInteracting ? "0.8" : "0.2"}
                      className="text-primary/15"
                    />
                  </pattern>
                  <radialGradient id="headerGlow" cx="50%" cy="50%" r="30%">
                    <stop offset="0%" stopColor="rgba(56, 182, 255, 0.15)" />
                    <stop offset="100%" stopColor="rgba(56, 182, 255, 0)" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#headerMesh)" />
                <circle
                  cx={`${mousePosition.x}%`}
                  cy={`${mousePosition.y}%`}
                  r={isInteracting ? "80" : "50"}
                  fill="url(#headerGlow)"
                  className="transition-all duration-400"
                />
              </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {floatingObjects.map((obj) => (
                <motion.div
                  key={obj.id}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    width: `${obj.size}px`,
                    height: `${obj.size}px`,
                  }}
                  animate={{
                    x: [0, Math.cos(obj.rotation * 0.008) * obj.speed * 15 + (mousePosition.x - 50) * 0.15, 0],
                    y: [0, Math.sin(obj.rotation * 0.008) * obj.speed * 15 + (mousePosition.y - 50) * 0.15, 0],
                    rotate: [obj.rotation, obj.rotation + 180],
                    scale: isInteracting ? [1, 1.3, 1.1] : [1, 1.15, 1],
                    opacity: [obj.opacity, obj.opacity * 1.4, obj.opacity],
                  }}
                  transition={{
                    duration: isInteracting ? 0.8 : 6 + obj.id * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <Icon
                    icon={obj.icon}
                    className="w-full h-full text-primary/30 dark:text-primary/20"
                    style={{
                      filter: "drop-shadow(0 0 1px rgba(56, 182, 255, 0.15))",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-primary/25"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  animate={{
                    x: [0, Math.cos(particle.angle) * particle.speed * 20 + (mousePosition.x - 50) * 0.3, 0],
                    y: [0, Math.sin(particle.angle) * particle.speed * 20 + (mousePosition.y - 50) * 0.3, 0],
                    scale: isInteracting ? [1, 1.8, 1.2] : [1, 1.4, 1],
                    opacity: [particle.opacity, particle.opacity * 1.6, particle.opacity],
                  }}
                  transition={{
                    duration: isInteracting ? 0.8 : 4 + particle.id * 0.08,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 ${
            isScrolled ? "opacity-100 transition-opacity duration-100" : "opacity-0 transition-opacity duration-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 ${
            isScrolled ? "opacity-100 transition-opacity duration-100" : "opacity-0 transition-opacity duration-100"
          }`}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
            }`}
          >
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
              <motion.img
                src={logoPath}
                alt="Robo Impex Logo"
                className={`transition-all duration-300 ${
                  isScrolled
                    ? `${logoDimensions.scrolled.height} ${logoDimensions.scrolled.width} ${logoDimensions.scrolled.smHeight} ${logoDimensions.scrolled.smWidth}`
                    : `${logoDimensions.notScrolled.height} ${logoDimensions.notScrolled.width} ${logoDimensions.notScrolled.smHeight} ${logoDimensions.notScrolled.smWidth}`
                }`}
                whileHover={{ rotate: 5 }}
                animate={{
                  scale: !isScrolled && isInteracting ? 1.1 : 1,
                  rotate: !isScrolled && isInteracting ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.6 }}
              />
              <div className="flex flex-col">
                <motion.span
                  className={`font-bold bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/80 bg-clip-text text-transparent transition-all duration-300 ${
                    isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    scale: !isScrolled && isInteracting ? 1.05 : 1,
                    y: !isScrolled && arrowDirection === "up" ? -5 : !isScrolled && arrowDirection === "down" ? 5 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  RoboImpex
                </motion.span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
                  Industrial Solutions
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: !isScrolled && arrowDirection === "up" ? -3 : !isScrolled && arrowDirection === "down" ? 3 : 0,
                    scale: !isScrolled && isInteracting ? 1.05 : 1,
                  }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:text-[#38b6ff] group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/50 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                className="hidden xl:flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: !isScrolled && isInteracting ? 1.05 : 1,
                }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400 transition-colors duration-300" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-10 pr-4 py-2 w-48 xl:w-64 text-sm bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 ${
                      isSearchFocused ? "ring-2 ring-[#38b6ff]/20 border-[#38b6ff]" : ""
                    }`}
                  />
                </div>
              </motion.div>

              <ThemeToggle />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
                animate={{
                  scale: !isScrolled && isInteracting ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="transition-all duration-300 hover:bg-[#38b6ff] hover:text-white"
                  >
                    <Link href="/wishlist">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="destructive"
                          className="h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs animate-pulse"
                        >
                          {wishlistCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
                animate={{
                  scale: !isScrolled && isInteracting ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="transition-all duration-300 hover:bg-[#38b6ff] hover:text-white"
                  >
                    <Link href="/cart">
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="destructive"
                          className="h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs animate-pulse"
                        >
                          {cartCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                className="hidden lg:flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: !isScrolled && isInteracting ? 1.05 : 1,
                }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link href="/inquiry">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all cursor-pointer duration-300 hover:scale-105 hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] dark:hover:bg-[#38b6ff]/20 group bg-transparent border-slate-200 dark:border-slate-700"
                  >
                    <motion.div
                      animate={{
                        rotate: !isScrolled && isInteracting ? [0, 20, -20, 0] : [0, 10, -10, 0],
                        scale: !isScrolled && isInteracting ? [1, 1.5, 1] : 1,
                      }}
                      transition={{
                        duration: !isScrolled && isInteracting ? 1 : 2,
                        repeat: !isScrolled && isInteracting ? 0 : Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    >
                      <Zap className="mr-1 xl:mr-2 h-4 w-4 group-hover:text-[#38b6ff]" />
                    </motion.div>
                    <span className="hidden xl:inline">Inquiry</span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="transition-all cursor-pointer duration-300 hover:scale-105 bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md"
                  >
                    <motion.div
                      animate={{
                        x: !isScrolled && isInteracting ? [0, 4, 0] : [0, 2, 0],
                        scale: !isScrolled && isInteracting ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: !isScrolled && isInteracting ? 1 : 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    >
                      <LogIn className="mr-1 xl:mr-2 h-4 w-4" />
                    </motion.div>
                    <span className="hidden xl:inline">Login</span>
                  </Button>
                </Link>
              </motion.div>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: !isScrolled && isInteracting ? 1.1 : 1,
                      rotate: !isScrolled && isInteracting ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Button variant="ghost" size="icon" className="hover:bg-[#38b6ff]/10 dark:hover:bg-[#38b6ff]/20">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 p-0"
                >
                  <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={logoPath || "/placeholder.svg"}
                        alt="Robo Impex Logo"
                        className={`${logoDimensions.mobile.height} ${logoDimensions.mobile.width}`}
                      />
                      <span className="font-bold text-lg bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/80 bg-clip-text text-transparent">
                        RoboImpex
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-6 p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <nav className="flex flex-col space-y-4">
                      {NAVIGATION.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="text-lg font-medium transition-all duration-300 hover:text-[#38b6ff] hover:translate-x-2 block py-2"
                            >
                              {item.name}
                            </Link>
                          </SheetClose>
                        </motion.div>
                      ))}
                    </nav>

                    <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
                      <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Contact Info</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a href={`tel:${CONTACT.PHONE}`} className="font-medium">
                            {CONTACT.PHONE}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <a href={`mailto:${CONTACT.EMAIL}`} className="font-medium break-all">
                            {CONTACT.EMAIL}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                        {socialLinks.map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${social.color} p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300`}
                            aria-label={social.name}
                          >
                            <Icon icon={social.icon} className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <SheetClose asChild>
                        <Link
                          href="/wishlist"
                          className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
                        >
                          <Heart className="h-5 w-5" />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/cart"
                          className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          <span>Cart ({cartCount})</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/inquiry">
                          <Button
                            variant="outline"
                            className="w-full hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] bg-transparent border-slate-200 dark:border-slate-700 my-4"
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            Inquiry
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button className="w-full bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  )
}