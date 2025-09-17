import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ToastProvider } from "@/components/shared/common/customToast"

import type { Metadata } from "next"
import type { ReactNode, JSX } from "react"
import { FloatingWhatsApp } from "@/components/shared/common/floatingWhatsapp"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "RoboImpex - Premium Robotics & Machinery Components",
  description:
    "Leading supplier of premium microchips, sensors, robotic parts, and AI-powered machinery components. From aerospace-grade chips to industrial automation solutions.",
  keywords: ["robotics components", "microchips", "sensors", "robotic parts", "machinery components", "AI automation"],
  authors: [{ name: "RoboImpex" }],
  openGraph: {
    title: "RoboImpex - Premium Robotics & Machinery Components",
    description: "Leading supplier of premium robotics and machinery components",
    type: "website",
  },
  generator: "v0.app",
  icons: { icon: "/favicon.ico", shortcut: "/logos/logo_transparent.png" },
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-mono ${playfairDisplay.variable} ${sourceSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <FloatingWhatsApp />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
