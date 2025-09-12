"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Zap, Shield } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedHeroSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons";



export function HeroSection(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const heroImages: string[] = [
    "/modern-industrial-factory-with-advanced-machinery.jpg",
    "/modern-industrial-machinery-factory-floor.jpg",
    "/high-tech-manufacturing-equipment-in-clean-facilit.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className=" bg-gradient-to-b from-background/80 to-transparent"></div>
      <section className="relative min-h-[90vh] flex px-4 md:px-8 lg:px-16 items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-[#38b6ff]/5">
          <AnimatedHeroSectionBackgroundIcons />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-[#38b6ff]/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-6 py-3 text-sm font-medium bg-[#38b6ff]/10 text-[#38b6ff] border-[#38b6ff]/20 hover:bg-[#38b6ff]/20 transition-all duration-300"
                  >
                    <motion.div>
                      <Icon icon="mdi:trending-up" className="w-4 h-4 mr-2" />
                    </motion.div>
                    #1 Industrial Machinery Marketplace
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <motion.span
                    className="bg-gradient-to-r from-[#38b6ff] via-[#38b6ff]/80 to-[#38b6ff] bg-clip-text text-transparent bg-[length:200%_100%]"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    Premium Industrial
                  </motion.span>
                  <br />
                  <span className="text-foreground">Machinery & Parts</span>
                </motion.h1>

                <motion.p
                  className="text-xl text-muted-foreground leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Connect with verified suppliers worldwide. Find quality
                  industrial equipment, electronic components, and manufacturing
                  solutions with cutting-edge technology.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="group transition-all duration-300 hover:scale-105 bg-[#38b6ff] hover:bg-[#38b6ff]/90 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                    </motion.div>
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  {
                    value: "50K+",
                    label: "Products",
                    icon: "mdi:package-variant",
                  },
                  { value: "10K+", label: "Suppliers", icon: "mdi:factory" },
                  { value: "100+", label: "Countries", icon: "mdi:earth" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Icon
                        icon={stat.icon}
                        className="w-5 h-5 text-[#38b6ff] mr-1 group-hover:scale-110 transition-transform"
                      />
                      <div className="text-2xl font-bold text-[#38b6ff] group-hover:text-[#38b6ff]/80 transition-colors">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#38b6ff]/20">
                <AnimatePresence mode="wait">
                  {heroImages.map(
                    (image, index) =>
                      index === currentSlide && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Industrial machinery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {heroImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-[#38b6ff] scale-125"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute -top-6 -right-6 bg-background/90 backdrop-blur-sm border rounded-2xl p-6 shadow-xl border-[#38b6ff]/20"
                animate={{ y: [-5, 5] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Verified Supplier
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ISO 9001 Certified
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-sm border rounded-2xl p-6 shadow-xl border-[#38b6ff]/20"
                animate={{ y: [5, -5] }}
                transition={{
                  duration: 3,
                  delay: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#38b6ff]/10 rounded-lg">
                    <motion.div>
                      <Zap className="w-6 h-6 text-[#38b6ff]" />
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs text-muted-foreground">
                      24-48 Hours
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 bg-background/90 backdrop-blur-sm border rounded-2xl p-4 shadow-xl border-[#38b6ff]/20"
                animate={{ x: [-3, 3] }}
                transition={{
                  duration: 2,
                  delay: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#38b6ff]">4.9★</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
