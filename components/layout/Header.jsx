"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Menu, User, Search } from "lucide-react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cartStorage, wishlistStorage } from "@/lib/utils/storage"

export function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(cartStorage.getItemCount())
      setWishlistCount(wishlistStorage.getItems().length)
    }

    updateCounts()

    const handleStorageChange = () => updateCounts()
    window.addEventListener("storage", handleStorageChange)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/" },
    { name: "About", href: "/" },
    { name: "Contact", href: "/" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b shadow-lg"
        : "bg-background/80 backdrop-blur-sm border-b border-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Icon
                icon="mdi:factory"
                className={`transition-all duration-300 text-primary group-hover:text-accent ${isScrolled ? "h-7 w-7" : "h-8 w-8"
                  } group-hover:scale-110 animate-glow`}
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-gradient transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}
              >
                IndustrialHub
              </span>
              <span className="text-xs text-muted-foreground font-medium">Premium B2B Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium transition-all duration-300 hover:text-accent group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-accent/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search industrial equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-muted/50 border-0 focus:bg-background transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative transition-all duration-300 hover:scale-110 hover:bg-accent/10"
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-bounce-gentle"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative transition-all duration-300 hover:scale-110 hover:bg-accent/10"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-bounce-gentle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-300 hover:scale-110 hover:bg-accent/10"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-morphism">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search products..." className="pl-10" />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="relative text-sm font-medium transition-all duration-300 hover:text-accent group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                        <span className="absolute inset-0 bg-accent/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="border-t pt-4 space-y-2">
                    <Link
                      href="/wishlist"
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors hover:text-accent hover:bg-accent/10 rounded-lg"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Wishlist ({wishlistCount})</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors hover:text-accent hover:bg-accent/10 rounded-lg"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart ({cartCount})</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
