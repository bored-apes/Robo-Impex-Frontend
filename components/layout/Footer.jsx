"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock, Award, Shield, Truck } from "lucide-react";

export function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/" },
      { name: "Contact", href: "/" },
      { name: "Our Team", href: "/" },
      { name: "Careers", href: "/" },
    ],
    products: [
      { name: "All Products", href: "/" },
      {
        name: "Plastic Machinery",
        href: "/",
      },
      { name: "Film Blowing", href: "/" },
      { name: "Extruders", href: "/" },
    ],
    support: [
      { name: "Help Center", href: "/" },
      { name: "Technical Support", href: "/" },
      { name: "Installation Guide", href: "/" },
      { name: "Warranty", href: "/" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Return Policy", href: "/" },
      { name: "Compliance", href: "/" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-muted/50 to-background border-t relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Icon
                  icon="mdi:factory"
                  className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="font-bold text-2xl text-gradient">
                  IndustrialHub
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Leading B2B marketplace for industrial machinery, equipment, and
              manufacturing solutions. Connecting businesses worldwide with
              quality suppliers.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  1234 Industrial Ave, Manufacturing District, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  info@industrialhub.com
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Mon-Fri: 9AM-6PM EST
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              {[
                {
                  icon: "mdi:linkedin",
                  href: "#",
                  color: "hover:text-blue-600",
                },
                {
                  icon: "mdi:twitter",
                  href: "#",
                  color: "hover:text-blue-400",
                },
                {
                  icon: "mdi:facebook",
                  href: "#",
                  color: "hover:text-blue-700",
                },
                { icon: "mdi:youtube", href: "#", color: "hover:text-red-600" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-accent/10 transition-all duration-300 hover:scale-110 ${social.color}`}
                  asChild
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={social.icon} className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-lg capitalize text-foreground">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} IndustrialHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <div className="flex items-center space-x-2">
                <Icon
                  icon="mdi:react"
                  className="h-5 w-5 text-blue-500 hover:scale-110 transition-transform"
                />
                <Icon
                  icon="mdi:tailwindcss"
                  className="h-5 w-5 text-cyan-500 hover:scale-110 transition-transform"
                />
                <Icon
                  icon="simple-icons:nextdotjs"
                  className="h-5 w-5 text-foreground hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
