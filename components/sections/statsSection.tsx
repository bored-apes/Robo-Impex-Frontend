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
      className="py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-8 lg:px-12 relative overflow-hidden w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#38b6ff]/5 via-transparent to-[#38b6ff]/5 w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,182,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,182,255,0.15),transparent_50%)] w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,182,255,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(56,182,255,0.12),transparent_50%)] w-full" />

      <AnimatedStateSectionBackgroundIcons />

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 w-full"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white w-full text-center">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-full w-full text-center">
            Join thousands of businesses worldwide who trust us for their industrial equipment needs and experience unmatched quality
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group cursor-pointer w-full"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#38b6ff]/10 to-[#38b6ff]/20 dark:from-[#38b6ff]/20 dark:to-[#38b6ff]/30 backdrop-blur-sm mb-3 sm:mb-4 md:mb-6 border border-[#38b6ff]/20 dark:border-[#38b6ff]/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#38b6ff]/25 transition-all duration-300 mx-auto"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  icon={stat.icon}
                  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#38b6ff] group-hover:animate-pulse mx-auto"
                />
              </motion.div>
              <motion.div
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300 w-full text-center"
                whileHover={{ scale: 1.05 }}
              >
                {animatedValues[index] || 0}
                {stat.suffix}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium w-full text-center">
                {stat.label}
              </div>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-[#38b6ff] to-transparent mx-auto mt-1 sm:mt-2 w-full"
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
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full"
        >
          {[
            { icon: "mdi:shield-check", text: "ISO 9001 Certified", desc: "Quality Management" },
            { icon: "mdi:truck-fast", text: "24/7 Support", desc: "Global Customer Service" },
            { icon: "mdi:medal", text: "Industry Awards", desc: "Excellence Recognition" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center group w-full"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:border-[#38b6ff]/30 transition-all duration-300 w-full mx-auto">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Icon
                    icon={item.icon}
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 mx-auto mb-1 sm:mb-2 md:mb-3 text-[#38b6ff] group-hover:scale-110 transition-transform duration-300 text-center"
                  />
                </motion.div>
                <div className="font-semibold text-sm sm:text-base md:text-lg mb-1 text-gray-900 dark:text-white w-full text-center">
                  {item.text}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base w-full text-center">
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

