"use client"

import { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({})
  const sectionRef = useRef(null)

  const stats = [
    {
      icon: "mdi:factory",
      value: 50000,
      suffix: "+",
      label: "Products Available",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: "mdi:account-group",
      value: 10000,
      suffix: "+",
      label: "Verified Suppliers",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: "mdi:earth",
      value: 100,
      suffix: "+",
      label: "Countries Served",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: "mdi:star",
      value: 4.9,
      suffix: "/5",
      label: "Customer Rating",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0
        const end = stat.value
        const duration = 2000
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            start = end
            clearInterval(timer)
          }

          setAnimatedValues((prev) => ({
            ...prev,
            [index]: stat.value === 4.9 ? start.toFixed(1) : Math.floor(start),
          }))
        }, 16)

        return () => clearInterval(timer)
      })
    }
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
          <p className="text-primary-foreground/90 text-xl max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses worldwide who trust us for their industrial equipment needs and experience
            unmatched quality
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon icon={stat.icon} className={`h-10 w-10 ${stat.color} group-hover:animate-bounce-gentle`} />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                {animatedValues[index] || 0}
                {stat.suffix}
              </div>
              <div className="text-primary-foreground/80 text-lg font-medium">{stat.label}</div>
              <div className="w-0 h-0.5 bg-accent mx-auto mt-2 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          {[
            { icon: "mdi:shield-check", text: "ISO 9001 Certified", desc: "Quality Management" },
            { icon: "mdi:truck-fast", text: "24/7 Support", desc: "Global Customer Service" },
            { icon: "mdi:medal", text: "Industry Awards", desc: "Excellence Recognition" },
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <Icon
                icon={item.icon}
                className="h-8 w-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-300"
              />
              <div className="font-semibold text-lg mb-1">{item.text}</div>
              <div className="text-primary-foreground/70 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
