"use client";
import type React from "react";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";

import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Menu,
  Search,
  Zap,
  LogIn,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { cartStorage, wishlistStorage } from "@/lib/utils/storage";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { name: string; href: string };
type SocialLink = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  color: string;
};

export function Header(): ReactElement {
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showTopBar, setShowTopBar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(cartStorage.getItemCount());
      setWishlistCount(wishlistStorage.getItems().length);
    };

    updateCounts();

    const handleStorageChange = () => updateCounts();
    window.addEventListener("storage", handleStorageChange);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY === 0) {
            setShowTopBar(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
              setShowTopBar(false);
            } else if (currentScrollY < lastScrollY || currentScrollY <= 80) {
              setShowTopBar(true);
            }
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  const contactInfo = {
    phone: "+91 77780 81772",
    email: "info.roboimpex@gmail.com",
  };

  const socialLinks: SocialLink[] = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color:
        "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color:
        "text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
      color:
        "text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color:
        "text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#",
      color:
        "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
    },
  ];

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
            <div className="absolute inset-0 bg-gradient-to-r bg-[#dfedf7]  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#38b6ff]/3 via-transparent to-[#38b6ff]/3" />
            <div className="container mx-auto px-4 sm:px-12 lg:px-20 py-1 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div
                    className="flex items-center space-x-2 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-[#38b6ff] dark:hover:text-[#38b6ff]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="font-medium"
                    >
                      {contactInfo.phone}
                    </a>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-[#38b6ff] dark:hover:text-[#38b6ff]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
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
                        <IconComponent className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/60 dark:border-slate-700/60 shadow-lg backdrop-blur-xl"
            : "bg-white/90 dark:bg-slate-900/90 border-b border-transparent backdrop-blur-md"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="container mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.img
                src="/logo_transparent.png"
                alt="Robo Impex Logo"
                className="h-10 w-12 transition-all duration-300"
                whileHover={{ rotate: 5 }}
              />
              <div className="flex flex-col">
                <motion.span
                  className={`font-bold bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/80 bg-clip-text text-transparent transition-all duration-300 ${
                    isScrolled ? "text-xl" : "text-2xl"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  RoboImpax
                </motion.span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Industrial Solutions
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
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

            <div className="flex items-center space-x-3">
              <motion.div
                className="hidden md:flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
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
                    className={`pl-10 pr-4 py-2 w-64 text-sm bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 ${
                      isSearchFocused
                        ? "ring-2 ring-[#38b6ff]/20 border-[#38b6ff]"
                        : ""
                    }`}
                  />
                </div>
              </motion.div>

              <ThemeToggle />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="transition-all duration-300 hover:bg-[#38b6ff] hover:dark:text-[#fff] hover:dark:bg-[#38b6ff]"
                  >
                    <Link href="/">
                      <Heart className="h-5 w-5" />
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
                          className="h-5 w-5 rounded-full p-0 text-xs animate-pulse"
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
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="transition-all duration-300 hover:bg-[#38b6ff] hover:dark:text-[#fff] hover:dark:bg-[#38b6ff]"
                  >
                    <Link href="/cart">
                      <ShoppingCart className="h-5 w-5" />
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
                          className="h-5 w-5 rounded-full p-0 text-xs animate-pulse"
                        >
                          {cartCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              <motion.div
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/inquiry">
                  <Button
                    variant="outline"
                    className="transition-all cursor-pointer duration-300 hover:scale-105 hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] dark:hover:bg-[#38b6ff]/20 group bg-transparent border-slate-200 dark:border-slate-700"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    >
                      <Zap className="mr-2 h-4 w-4 group-hover:text-[#38b6ff]" />
                    </motion.div>
                    Inquiry
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="transition-all cursor-pointer  duration-300 hover:scale-105 bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md">
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                    </motion.div>
                    Login
                  </Button>
                </Link>
              </motion.div>

              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-[#38b6ff]/10 dark:hover:bg-[#38b6ff]/20"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-col space-y-6 mt-8">
                    <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-lg p-4 border border-slate-200/50 dark:border-slate-700/50">
                      <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
                        Contact Info
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                          <Phone className="h-4 w-4" />
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="font-medium"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="font-medium"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                        {socialLinks.slice(0, 4).map((social) => {
                          const IconComponent = social.icon;
                          return (
                            <a
                              key={social.name}
                              href={social.url}
                              className={`${social.color} p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300`}
                              aria-label={social.name}
                            >
                              <IconComponent className="h-4 w-4" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <nav className="flex flex-col space-y-4">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className="text-lg font-medium transition-all duration-300 hover:text-[#38b6ff] hover:translate-x-2 block py-2"
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                      <Link
                        href="/"
                        className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
                      >
                        <Heart className="h-5 w-5" />
                        <span>Wishlist ({wishlistCount})</span>
                      </Link>
                      <Link
                        href="/cart"
                        className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Cart ({cartCount})</span>
                      </Link>
                      <Link href="/inquiry">
                        <Button
                          variant="outline"
                          className="w-full hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] bg-transparent border-slate-200 dark:border-slate-700"
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          Inquiry
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button className="w-full bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md">
                          <LogIn className="mr-2 h-4 w-4" />
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
