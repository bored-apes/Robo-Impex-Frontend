"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, Zap, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import { cartStorage, wishlistStorage } from "@/lib/utils/storage";
import { NAVIGATION } from "@/data/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { TopBar } from "./hederSections/topBar";
import { MobileMenu } from "./hederSections/mobileMenu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SearchSuggestions } from "./hederSections/SearchSuggestions";
export function Header() {
  const { theme } = useTheme();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showTopBar, setShowTopBar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  const logoPath = useMemo(
    () => (theme === "dark" ? "/logos/logo_3_dark.png" : "/logos/logo_3.png"),
    [theme]
  );

  const logoDimensions = useMemo(
    () => ({
      notScrolled: {
        height: "h-8 md:h-10",
        width: "w-auto",
      },
      scrolled: {
        height: "h-7 md:h-9",
        width: "w-auto",
      },
      mobile: {
        height: "h-8",
        width: "w-auto",
      },
    }),
    []
  );

  const getUserDisplayName = useCallback(() => {
    if (!user) return "User";
    if (user?.firstname && user?.lastname) {
      return `${user?.firstname} ${user?.lastname}`;
    }
    if (user?.firstname) return user?.firstname;
    if (user?.email) return user?.email.split("@")[0];
    return "User";
  }, [user]);

  const getUserAvatar = useCallback(() => {
    return "/images/default-avatar.jpg";
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, [logout, router]);

  const isActiveLink = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

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
          setIsScrolled(currentScrollY > 0);

          if (currentScrollY === 0) {
            setShowTopBar(true);
          } else {
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

  return (
    <>
      <TopBar showTopBar={showTopBar} />

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/60 dark:border-slate-700/60 shadow-lg backdrop-blur-xl"
            : "bg-transparent border-b border-transparent backdrop-blur-md"
        }`}
        // Remove overflow-hidden if it exists
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#38b6ff]/2 via-transparent to-[#38b6ff]/2 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/80 to-slate-50/50 dark:from-slate-900/50 dark:via-slate-800/80 dark:to-slate-900/50 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative z-10">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
            }`}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <img
                src={logoPath || "/placeholder.svg"}
                alt="Robo Impex Logo"
                className={`transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? `${logoDimensions.scrolled.height} ${logoDimensions.scrolled.width}`
                    : `${logoDimensions.notScrolled.height} ${logoDimensions.notScrolled.width}`
                }`}
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 group ${
                    isActiveLink(item.href)
                      ? "text-[#38b6ff]"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#38b6ff]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/50 transition-all duration-300 ${
                      isActiveLink(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/orders"
                  className={`relative text-sm font-medium transition-all duration-300 group ${
                    isActiveLink("/orders")
                      ? "text-[#38b6ff]"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#38b6ff]"
                  }`}
                >
                  Orders
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/50 transition-all duration-300 ${
                      isActiveLink("/orders")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
              {/* Updated Search Component */}
              <div className="hidden xl:flex items-center">
                <SearchSuggestions className="w-64" />
              </div>

              <ThemeToggle />

              <div className="hidden sm:block">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 md:h-10 md:w-10 transition-all duration-300 hover:bg-[#38b6ff] hover:text-white hover:scale-105"
                  >
                    <Link href="/wishlist">
                      <Heart className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </Button>
                  {wishlistCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 md:h-10 md:w-10 transition-all duration-300 hover:bg-[#38b6ff] hover:text-white hover:scale-105"
                  >
                    <Link href="/cart">
                      <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </Button>
                  {cartCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/Enquiry">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 xl:px-4 transition-all cursor-pointer duration-300 hover:scale-105 hover:bg-[#38b6ff]/10 hover:border-[#38b6ff] hover:text-[#38b6ff] dark:hover:bg-[#38b6ff]/20 group bg-transparent border-slate-200 dark:border-slate-700"
                  >
                    <Zap className="mr-1 xl:mr-2 h-4 w-4 group-hover:text-[#38b6ff]" />
                    <span className="hidden xl:inline text-sm">Enquiry</span>
                  </Button>
                </Link>

                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 h-9 w-9 md:h-10 md:w-10 overflow-hidden hover:ring-2 hover:ring-[#38b6ff] transition">
                        <Avatar className="h-full w-full">
                          <AvatarImage
                            src={getUserAvatar()}
                            alt={getUserDisplayName()}
                          />
                          <AvatarFallback>
                            {user?.firstname?.charAt(0) ||
                              user?.email?.charAt(0) ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      sideOffset={8}
                      className="w-60 rounded-xl shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 z-[9999] p-2"
                    >
                      {/* User Info */}
                      <div className="px-2 py-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <DropdownMenuSeparator className="my-2 bg-slate-200 dark:bg-slate-700" />

                      {/* Orders */}
                      <DropdownMenuItem
                        onClick={() => router.push("/orders")}
                        className="cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-[#38b6ff]/10 dark:hover:bg-[#38b6ff]/20 transition"
                      >
                        <Icon
                          icon="material-symbols-light:orders-outline-rounded"
                          className="h-5 w-5 text-slate-700 dark:text-slate-200"
                        />
                        <span className="text-sm">My Orders</span>
                      </DropdownMenuItem>

                      {/* Logout */}
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer flex items-center gap-2 p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800/40 transition"
                      >
                        <Icon
                          icon="clarity:logout-line"
                          className="h-5 w-5 text-red-500"
                        />
                        <span className="text-sm text-red-600 dark:text-red-400">
                          Log out
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      className="h-9 px-3 xl:px-4 transition-all cursor-pointer duration-300 hover:scale-105 bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-md"
                    >
                      <LogIn className="mr-1 xl:mr-2 h-4 w-4" />
                      <span className="hidden xl:inline text-sm">Login</span>
                    </Button>
                  </Link>
                )}
              </div>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-[#38b6ff]/10 dark:hover:bg-[#38b6ff]/20 cursor-pointer hover:scale-110 transition-all duration-300"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <MobileMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  wishlistCount={wishlistCount}
                  cartCount={cartCount}
                  onLogout={handleLogout}
                  logoPath={logoPath}
                  logoDimensions={logoDimensions}
                  getUserDisplayName={getUserDisplayName}
                  getUserAvatar={getUserAvatar}
                />
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
