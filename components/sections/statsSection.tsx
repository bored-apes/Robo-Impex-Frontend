"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { AnimatedStateSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons";
import { stats } from "@/data/constants";

export function StatsSection(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animatedValues, setAnimatedValues] = useState<
    Record<number, number | string>
  >({});
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value as number;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setAnimatedValues((prev) => ({
            ...prev,
            [index]: stat.value === 4.9 ? start.toFixed(1) : Math.floor(start),
          }));
        }, 16);
      });
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef as any}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#38b6ff]/5 via-transparent to-[#38b6ff]/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,182,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,182,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,182,255,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(56,182,255,0.12),transparent_50%)]" />

      <AnimatedStateSectionBackgroundIcons />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses worldwide who trust us for their
            industrial equipment needs and experience unmatched quality
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#38b6ff]/10 to-[#38b6ff]/20 dark:from-[#38b6ff]/20 dark:to-[#38b6ff]/30 backdrop-blur-sm mb-4 sm:mb-6 border border-[#38b6ff]/20 dark:border-[#38b6ff]/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#38b6ff]/25 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  icon={stat.icon}
                  className="h-8 w-8 sm:h-10 sm:w-10 text-[#38b6ff] group-hover:animate-pulse"
                />
              </motion.div>
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {animatedValues[index] || 0}
                {stat.suffix}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg font-medium">
                {stat.label}
              </div>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-[#38b6ff] to-transparent mx-auto mt-2"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            {
              icon: "mdi:shield-check",
              text: "ISO 9001 Certified",
              desc: "Quality Management",
            },
            {
              icon: "mdi:truck-fast",
              text: "24/7 Support",
              desc: "Global Customer Service",
            },
            {
              icon: "mdi:medal",
              text: "Industry Awards",
              desc: "Excellence Recognition",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:border-[#38b6ff]/30 transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon
                    icon={item.icon}
                    className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-[#38b6ff] group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
                <div className="font-semibold text-base sm:text-lg mb-1 text-gray-900 dark:text-white">
                  {item.text}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
