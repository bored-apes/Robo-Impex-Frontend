"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Cpu,
  Zap,
  Microscope as Microchip,
  CircuitBoard,
  Cog,
  Play,
  Sparkles,
  Rocket,
  Shield,
  Wifi,
  Database,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"

export function HeroSection() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    handleResize()
    setIsVisible(true)

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const techIcons = useMemo(
    () => [
      {
        Icon: Cpu,
        delay: 0,
        position: { top: "12%", left: "5%" },
        size: "w-5 h-5 sm:w-6 h-6 md:w-7 h-7",
        animation: "animate-chip-glow",
      },
      {
        Icon: Microchip,
        delay: 0.3,
        position: { top: "20%", right: "8%" },
        size: "w-4 h-4 sm:w-5 h-5 md:w-6 h-6",
        animation: "animate-circuit-pulse",
      },
      {
        Icon: CircuitBoard,
        delay: 0.6,
        position: { top: "60%", left: "4%" },
        size: "w-6 h-6 sm:w-7 h-7 md:w-8 h-8",
        animation: "animate-floating-up",
      },
      {
        Icon: Cog,
        delay: 0.9,
        position: { top: "65%", right: "6%" },
        size: "w-4 h-4 sm:w-5 h-5 md:w-6 h-6",
        animation: "animate-micro-bounce",
      },
      {
        Icon: Zap,
        delay: 1.2,
        position: { top: "35%", right: "4%" },
        size: "w-5 h-5 sm:w-6 h-6 md:w-7 h-7",
        animation: "animate-circuit-pulse",
      },
      {
        Icon: Shield,
        delay: 1.5,
        position: { top: "45%", left: "2%" },
        size: "w-4 h-4 sm:w-5 h-5 md:w-6 h-6",
        animation: "animate-floating-down",
      },
      {
        Icon: Sparkles,
        delay: 1.8,
        position: { top: "75%", right: "12%" },
        size: "w-3 h-3 sm:w-4 h-4 md:w-5 h-5",
        animation: "animate-particle-float",
      },
      {
        Icon: Wifi,
        delay: 2.1,
        position: { top: "25%", left: "12%" },
        size: "w-4 h-4 sm:w-5 h-5 md:w-6 h-6",
        animation: "animate-chip-glow",
      },
      {
        Icon: Database,
        delay: 2.4,
        position: { top: "55%", right: "15%" },
        size: "w-5 h-5 sm:w-6 h-6 md:w-7 h-7",
        animation: "animate-floating-up",
      },
      {
        Icon: Layers,
        delay: 2.7,
        position: { top: "80%", left: "8%" },
        size: "w-4 h-4 sm:w-5 h-5 md:w-6 h-6",
        animation: "animate-micro-bounce",
      },
    ],
    [],
  )

  const stats = useMemo(
    () => [
      { icon: Cpu, value: "15K+", label: "Microchips", description: "Premium quality", delay: 0.2 },
      { icon: CircuitBoard, value: "8K+", label: "Circuit Boards", description: "Industrial grade", delay: 0.4 },
      { icon: Rocket, value: "3K+", label: "Robotic Parts", description: "Precision engineered", delay: 0.6 },
      { icon: Zap, value: "2K+", label: "Sensors", description: "Advanced technology", delay: 0.8 },
    ],
    [],
  )

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-14 ${isVisible ? "animate-hero-slide-up" : "opacity-0"}`}
    >
      {windowSize.width > 768 &&
        techIcons.map(({ Icon, delay, position, size, animation }, index) => (
          <div
            key={index}
            className={`absolute p-2 sm:p-3 rounded-full glass-morphism electronics-glow hover-lift cursor-pointer ${animation}`}
            style={{
              ...position,
              animationDelay: `${delay}s`,
              transform: `translateY(${scrollY * 0.05}px) translateX(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${delay}s`,
            }}
          >
            <Icon className={`${size} text-[#38b6ff]`} />
          </div>
        ))}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 text-center">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <Badge
            variant="secondary"
            className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium glass-morphism electronics-glow text-[#38b6ff] hover-lift transition-all duration-500 inline-flex items-center gap-1 ${isVisible ? "animate-hero-slide-down" : "opacity-0 translate-y-4"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <Microchip className="w-3 h-3 sm:w-4 sm:h-4 animate-circuit-pulse" />
            Premium Robotics & Machinery Components
          </Badge>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span
                className={`block ${isVisible ? "animate-hero-slide-up" : "opacity-0 translate-y-8"}`}
                style={{ animationDelay: "0.4s" }}
              >
                <span className="text-gradient bg-gradient-to-r from-[#38b6ff] via-[#0ea5e9] to-[#38b6ff] bg-clip-text text-transparent animate-gradient-shift">
                  Advanced Robotics
                </span>
              </span>
              <span
                className={`text-foreground block mt-2 ${isVisible ? "animate-hero-slide-up" : "opacity-0 translate-y-8"}`}
                style={{ animationDelay: "0.6s" }}
              >
                Components & Chips
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${isVisible ? "animate-hero-slide-up" : "opacity-0 translate-y-8"}`}
              style={{ animationDelay: "0.8s" }}
            >
              Discover premium microchips, sensors, robotic parts, and machinery components to power your innovations
              with cutting-edge technology.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "animate-hero-slide-up" : "opacity-0 translate-y-8"}`}
            style={{ animationDelay: "1s" }}
          >
            <Button
              size="lg"
              className="btn-iot text-white px-8 py-4 rounded-xl text-lg font-semibold hover-lift group"
              asChild
            >
              <Link href="/products">
                Explore Components
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-morphism hover-lift px-8 py-4 rounded-xl text-lg font-semibold group border-[#38b6ff]/30 hover:border-[#38b6ff] hover:bg-[#38b6ff]/10 bg-transparent text-foreground"
              asChild
            >
              <Link href="/demo">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`iot-card p-4 md:p-6 glass-morphism electronics-glow rounded-xl border border-[#38b6ff]/20 hover-lift ${isVisible ? "animate-hero-slide-up" : "opacity-0 translate-y-8"}`}
                style={{ animationDelay: `${1.2 + stat.delay}s` }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-[#38b6ff]/20 animate-chip-glow">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#38b6ff]" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-[#38b6ff] animate-micro-bounce">
                      {stat.value}
                    </div>
                    <div className="text-foreground text-sm md:text-base font-medium">{stat.label}</div>
                    <div className="text-muted-foreground text-xs md:text-sm">{stat.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 opacity-5 pointer-events-none">
        <CircuitBoard className="w-full h-full text-[#38b6ff] animate-spin-slow" style={{ animationDuration: "20s" }} />
      </div>
    </section>
  )
}
