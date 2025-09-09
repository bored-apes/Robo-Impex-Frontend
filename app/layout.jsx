import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "IndustrialHub - Premium B2B Machinery & Equipment",
  description:
    "Leading B2B marketplace for industrial machinery, equipment, and manufacturing solutions. Find quality suppliers and compare products.",
  keywords: ["industrial machinery", "B2B marketplace", "manufacturing equipment", "suppliers"],
  authors: [{ name: "IndustrialHub" }],
  openGraph: {
    title: "IndustrialHub - Premium B2B Machinery & Equipment",
    description: "Leading B2B marketplace for industrial machinery and equipment",
    type: "website",
  },
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.jpg",
    apple: "/apple-touch-icon.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
