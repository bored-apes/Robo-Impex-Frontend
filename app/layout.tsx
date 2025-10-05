import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ToastProvider } from "@/components/shared/common/customToast";

import type { Metadata } from "next";
import type { ReactNode, JSX } from "react";
import { FloatingWhatsApp } from "@/components/shared/common/floatingWhatsapp";
import { AuthProvider } from "@/context/authContext";
import { FloatingScrollToTop } from "@/components/shared/common/floatingScrollToTop";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RoboImpex - Premium Robotics & Machinery Components",
  description:
    "Leading supplier of premium microchips, sensors, robotic parts, and AI-powered machinery components. From aerospace-grade chips to industrial automation solutions.",
  keywords: [
    "robotics components",
    "microchips",
    "sensors",
    "robotic parts",
    "machinery components",
    "AI automation",
  ],
  authors: [{ name: "RoboImpex" }],
  openGraph: {
    title: "RoboImpex - Premium Robotics & Machinery Components",
    description:
      "Leading supplier of premium robotics and machinery components",
    type: "website",
  },
  icons: {
    icon: "/logos/black_logo.ico",
    apple: "/logos/black_logo.ico",
    shortcut: "/logos/black_logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logos/black_logo.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logos/black_logo.png" />
      </head>
      <body
        className={`font-sans ${playfairDisplay.variable} ${sourceSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <FloatingScrollToTop />
              <FloatingWhatsApp />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
