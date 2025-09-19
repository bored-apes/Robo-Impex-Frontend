"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  ShoppingCart,
  Zap,
  LogIn,
  LogOut,
  Phone,
  Mail,
  User,
  X,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { CONTACT, SOCIAL, NAVIGATION } from "@/data/constants";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: any;
  wishlistCount: number;
  cartCount: number;
  onLogout: () => void;
  logoPath: string;
  logoDimensions: any;
  getUserDisplayName: () => string;
  getUserAvatar: () => string;
}

export function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  wishlistCount,
  cartCount,
  onLogout,
  logoPath,
  logoDimensions,
  getUserDisplayName,
  getUserAvatar,
}: MobileMenuProps) {
  const pathname = usePathname();

  const socialLinks = [
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

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <SheetContent
      side="right"
      className="w-full max-w-[85vw] sm:max-w-[320px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 p-0"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={logoPath || "/placeholder.svg"}
            alt="Robo Impex Logo"
            className={`${logoDimensions.mobile.height || "h-8"} ${
              logoDimensions.mobile.width || "w-auto"
            }`}
          />
        </div>
        <SheetClose asChild>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full  transition-all duration-300 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-slate-300" />
          </button>
        </SheetClose>
      </div>

      <div className="flex flex-col space-y-4 sm:space-y-6 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
        {isAuthenticated && user && (
          <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-lg p-3 sm:p-4 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage
                  src={getUserAvatar() || "/placeholder.svg"}
                  alt={getUserDisplayName()}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-xs sm:text-sm">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-muted-foreground break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex flex-col space-y-3 sm:space-y-4">
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
                  className={`text-base sm:text-lg font-medium transition-all duration-300 hover:text-[#38b6ff] hover:translate-x-2 block py-1.5 sm:py-2 ${
                    isActiveLink(item.href) ? "text-[#38b6ff]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </SheetClose>
            </motion.div>
          ))}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAVIGATION.length * 0.1 }}
            >
              <SheetClose asChild>
                <Link
                  href="/orders"
                  className={`text-base sm:text-lg font-medium transition-all duration-300 hover:text-[#38b6ff] hover:translate-x-2 block py-1.5 sm:py-2 ${
                    isActiveLink("/orders") ? "text-[#38b6ff]" : ""
                  }`}
                >
                  Orders
                </Link>
              </SheetClose>
            </motion.div>
          )}
        </nav>

        <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-lg p-3 sm:p-4 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 text-slate-900 dark:text-slate-100">
            Contact Info
          </h3>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a
                href={`tel:${CONTACT.PHONE}`}
                className="font-medium break-all"
              >
                {CONTACT.PHONE}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="font-medium break-all"
              >
                {CONTACT.EMAIL}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} p-1 sm:p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300`}
                aria-label={social.name}
              >
                <Icon icon={social.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
          <SheetClose asChild>
            <Link
              href="/wishlist"
              className="flex items-center space-x-2 sm:space-x-3  cursor-pointer px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/cart"
              className="flex items-center space-x-2 sm:space-x-3  cursor-pointer px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 rounded-lg text-slate-700 dark:text-slate-300"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Cart ({cartCount})</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/inquiry">
              <Button
                variant="outline"
                className="w-full h-10 sm:h-12  cursor-pointer hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] bg-transparent border-slate-200 dark:border-slate-700 my-3 sm:my-4 text-xs sm:text-sm"
              >
                <Zap className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Inquiry
              </Button>
            </Link>
          </SheetClose>

          {isAuthenticated && user ? (
            <div className="space-y-2 sm:space-y-3">
              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="w-full h-10 sm:h-12 bg-transparent  cursor-pointer border-slate-200 dark:border-slate-700 hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] text-xs sm:text-sm"
                  >
                    <Icon
                      icon="material-symbols-light:orders-outline-rounded"
                      className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    My Orders
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full h-10 sm:h-12 bg-transparent  cursor-pointer border-slate-200 dark:border-slate-700 text-destructive hover:text-destructive text-xs sm:text-sm"
                >
                  <LogOut className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Logout
                </Button>
              </SheetClose>
            </div>
          ) : (
            <SheetClose asChild>
              <Link href="/login">
                <Button className="w-full h-10 sm:h-12 bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md text-xs sm:text-sm cursor-pointer">
                  <LogIn className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Login
                </Button>
              </Link>
            </SheetClose>
          )}
        </div>
      </div>
    </SheetContent>
  );
}
