"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Play, Star, Users, Award, Truck, Zap, Shield } from "lucide-react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const heroImages = [
    "/modern-industrial-factory-with-advanced-machinery.jpg",
    "/high-tech-manufacturing-equipment-in-clean-facilit.jpg",
    "/automated-production-line-with-robotic-systems.jpg",
  ]

  // const features = [
  //   { icon: Users, text: "10,000+ Verified Suppliers", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  //   { icon: Award, text: "ISO Certified Quality", color: "text-green-500", bgColor: "bg-green-500/10" },
  //   { icon: Truck, text: "Global Shipping", color: "text-purple-500", bgColor: "bg-purple-500/10" },
  //   { icon: Star, text: "4.9/5 Customer Rating", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  // ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float blur-sm"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full animate-float blur-sm"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/20 rounded-full animate-float blur-sm"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/15 rounded-full animate-float blur-sm"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Interactive Cursor Effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-6 py-3   text-sm font-medium animate-slide-in-left glass-morphism">
                <Icon icon="mdi:trending-up" className="w-4 h-4 mr-2 animate-bounce-gentle" />
                #1 B2B Industrial Marketplace
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gradient animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]">
                  Premium Industrial
                </span>
                <br />
                <span className="text-foreground">Machinery & Equipment</span>
              </h1>

              <p
                className="text-xl text-muted-foreground leading-relaxed max-w-lg animate-slide-in-left"
                style={{ animationDelay: "0.2s" }}
              >
                Connect with verified suppliers worldwide. Find quality industrial equipment, compare prices, and
                streamline your procurement process with cutting-edge technology.
              </p>
            </div>

            {/* Enhanced Feature Pills */}
            {/* <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-xl bg-card border hover-lift glass-morphism group cursor-pointer animate-fade-in-up ${feature.bgColor}`}
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div
                    className={`p-2 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div> */}

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
              <Button size="lg" className="group transition-all duration-300 hover:scale-105 animate-glow" asChild>
                <Link href="/">
                  <Zap className="mr-2 h-5 w-5 animate-pulse" />
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* <Button
                variant="outline"
                size="lg"
                className="group transition-all duration-300 hover:scale-105 glass-morphism bg-transparent"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button> */}
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex items-center space-x-8 pt-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              {[
                { value: "50K+", label: "Products", icon: "mdi:package-variant" },
                { value: "10K+", label: "Suppliers", icon: "mdi:factory" },
                { value: "100+", label: "Countries", icon: "mdi:earth" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="flex items-center justify-center mb-1">
                    <Icon
                      icon={stat.icon}
                      className="w-5 h-5 text-primary mr-1 group-hover:scale-110 transition-transform"
                    />
                    <div className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Image Carousel */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl industrial-border">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg?height=600&width=500&query=industrial machinery factory"}
                    alt={`Industrial machinery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              ))}

              {/* Enhanced Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-card border rounded-2xl p-6 shadow-xl animate-float glass-morphism">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Verified Supplier</div>
                  <div className="text-xs text-muted-foreground">ISO 9001 Certified</div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -left-6 bg-card border rounded-2xl p-6 shadow-xl animate-float glass-morphism"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">24-48 Hours</div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-1/2 -right-4 bg-card border rounded-2xl p-4 shadow-xl animate-float glass-morphism"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
