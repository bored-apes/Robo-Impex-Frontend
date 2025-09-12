"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Award,
  Cog,
  Cpu,
  Radio,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export function AnimatedFeatureCategoryBackgroundIcons() {
  return (
    <>
      <motion.div
        className="absolute top-10 left-10 w-8 h-8"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:chip" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 w-6 h-6"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/4 w-10 h-10"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:cpu-64-bit" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-10 w-7 h-7"
        animate={{ rotate: -360, y: [-10, 10] }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:resistor" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-1/3 w-9 h-9"
        animate={{ rotate: 360 }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon
          icon="mdi:integrated-circuit-chip"
          className="w-full h-full text-[#38b6ff]"
        />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-1/2 w-5 h-5"
        animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:arduino" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6"
        animate={{ rotate: -360, x: [-5, 5] }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon
          icon="mdi:raspberry-pi"
          className="w-full h-full text-[#38b6ff]"
        />
      </motion.div>
    </>
  );
}

export function AnimatedHeroSectionBackgroundIcons() {
  return (
    <div className="absolute inset-0 opacity-15">
      <motion.div
        className="absolute top-20 left-10 w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:chip" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/4 w-12 h-12"
        animate={{ y: [-10, 10] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Icon icon="mdi:cpu-64-bit" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-14 h-14"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:resistor" className="w-full h-full text-[#38b6ff]" />
      </motion.div>
      <motion.div
        className="absolute top-1/4 left-1/3 w-10 h-10"
        animate={{ rotate: -360 }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon
          icon="mdi:integrated-circuit-chip"
          className="w-full h-full text-[#38b6ff]"
        />
      </motion.div>
    </div>
  );
}

export function AnimatedProductSectionBackgroundIcons() {
  return (
    <>
      <div className="absolute inset-0 opacity-12 pointer-events-none">
        <motion.div
          className="absolute top-16 left-16 w-12 h-12"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:arduino" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-24 w-8 h-8"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:raspberry-pi"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-24 left-1/3 w-10 h-10"
          animate={{ rotate: 360, y: [-5, 5] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:microchip" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-16 w-14 h-14"
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:robot-industrial"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute top-20 left-1/3 w-6 h-6"
          animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:integrated-circuit-chip"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-16 right-1/2 w-8 h-8"
          animate={{ rotate: -360, x: [-3, 3] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
      </div>
    </>
  );
}

export function AnimatedNewsLetterSectionBackgroundIcons() {
  return (
    <>
      <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:cog" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 w-12 h-12"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:gear" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-1/4 w-20 h-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:robot-industrial"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-16 w-14 h-14"
          animate={{ rotate: -360 }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:factory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/2 w-10 h-10"
          animate={{ rotate: 360, y: [-5, 5] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:chip" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-8 h-8"
          animate={{ rotate: -360, scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 left-1/3 w-6 h-6"
          animate={{ rotate: 360, x: [-3, 3] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:cpu-64-bit"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-12 h-12"
          animate={{ rotate: -360, y: [-2, 2] }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:resistor" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
      </div>
    </>
  );
}
export function AnimatedStateSectionBackgroundIcons() {
  return (
    <>
      <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:cog" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 w-12 h-12"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:gear" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-1/4 w-20 h-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:robot-industrial"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-16 w-14 h-14"
          animate={{ rotate: -360 }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:factory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-1/2 w-10 h-10"
          animate={{ rotate: 360, y: [-5, 5] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:chip" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-8 h-8"
          animate={{ rotate: -360, scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 left-1/3 w-6 h-6"
          animate={{ rotate: 360, x: [-3, 3] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:cpu-64-bit"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-12 h-12"
          animate={{ rotate: -360, y: [-2, 2] }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:resistor" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
      </div>
    </>
  );
}
export function AnimatedFooterSectionBackgroundIcons() {
  return (
    <>
      <div className="absolute inset-0 opacity-8">
        <motion.div
          className="absolute top-10 right-20 w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:chip" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-20 w-12 h-12"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:memory" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-10 h-10"
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon
            icon="mdi:cpu-64-bit"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute top-20 left-10 w-8 h-8"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon icon="mdi:resistor" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-14 h-14"
          animate={{ rotate: -180 }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:integrated-circuit-chip"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/3 w-6 h-6"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon
            icon="mdi:transistor"
            className="w-full h-full text-[#38b6ff]"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/2 w-12 h-12"
          animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon icon="mdi:microchip" className="w-full h-full text-[#38b6ff]" />
        </motion.div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38b6ff]/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#38b6ff]/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#38b6ff]/5 rounded-full blur-2xl"></div>
      </div>
    </>
  );
}
export function GrowthAnimation() {
  return (
    <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none overflow-hidden">
      {/* Growth trajectory lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 50 400 Q 200 300 350 200 T 650 100"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary"
          strokeDasharray="10,5"
          animate={{ strokeDashoffset: [0, -15] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.path
          d="M 100 450 Q 250 350 400 250 T 700 150"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-accent"
          strokeDasharray="8,4"
          animate={{ strokeDashoffset: [0, -12] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 0.5,
          }}
        />
      </svg>

      {/* Animated gears representing company machinery */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Cog className="w-full h-full text-primary" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-32 w-12 h-12"
        animate={{ rotate: -360 }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Cog className="w-full h-full text-accent" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/3 w-20 h-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Cog className="w-full h-full text-primary opacity-50" />
      </motion.div>

      {/* Team collaboration icons */}
      <motion.div
        className="absolute top-1/2 right-20 w-10 h-10"
        animate={{ y: [-5, 5], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Users className="w-full h-full text-accent" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-8 h-8"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <TrendingUp className="w-full h-full text-primary" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 left-1/2 w-12 h-12"
        animate={{ rotate: -360, x: [-3, 3] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Award className="w-full h-full text-accent" />
      </motion.div>
    </div>
  );
}
export function ConnectivityAnimation() {
  return (
    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
      {/* Network nodes */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-network-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
      />
      <motion.div
        className="absolute top-40 right-32 w-4 h-4 bg-accent rounded-full animate-network-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-32 w-4 h-4 bg-primary rounded-full animate-network-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-4 h-4 bg-accent rounded-full animate-network-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1.5,
        }}
      />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="20%"
          y1="20%"
          x2="80%"
          y2="40%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.line
          x1="80%"
          y1="40%"
          x2="32%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 0.5,
          }}
        />
        <motion.line
          x1="32%"
          y1="80%"
          x2="80%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          strokeDasharray="5,5"
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>

      {/* IoT devices */}
      <motion.div
        className="absolute top-16 right-16 w-12 h-12"
        animate={{ rotate: 360, y: [-2, 2] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Wifi className="w-full h-full text-primary" />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-16 w-10 h-10"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <Cpu className="w-full h-full text-accent" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 w-8 h-8"
        animate={{ rotate: -360, x: [-3, 3] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Radio className="w-full h-full text-primary" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-14 h-14"
        animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Zap className="w-full h-full text-accent" />
      </motion.div>
    </div>
  );
}

export function CommunicationAnimation() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  return (
    <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none overflow-hidden">
      {/* Data packets flowing */}
      <motion.div
        className="absolute top-20 left-0 w-4 h-2 bg-primary rounded-full"
        animate={{ x: [0, width] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 0,
        }}
      />
      <motion.div
        className="absolute top-40 left-0 w-4 h-2 bg-accent rounded-full"
        animate={{ x: [0, width] }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-60 left-0 w-4 h-2 bg-primary rounded-full"
        animate={{ x: [0, width] }}
        transition={{
          duration: 4.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Communication towers */}
      <motion.div
        className="absolute top-16 right-20 w-12 h-12"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <Icon
          icon="mdi:transmission-tower"
          className="w-full h-full text-primary"
        />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-20 w-10 h-10"
        animate={{ rotate: 360, y: [-2, 2] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:antenna" className="w-full h-full text-accent" />
      </motion.div>

      {/* Circuit patterns */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.circle
          cx="25%"
          cy="30%"
          r="3"
          fill="currentColor"
          className="text-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0,
          }}
        />
        <motion.circle
          cx="75%"
          cy="60%"
          r="3"
          fill="currentColor"
          className="text-accent"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        />
        <motion.circle
          cx="50%"
          cy="80%"
          r="3"
          fill="currentColor"
          className="text-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </svg>

      {/* Rotating gears */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-8 h-8"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:cog" className="w-full h-full text-primary" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-12 h-12"
        animate={{ rotate: -360 }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:gear" className="w-full h-full text-accent" />
      </motion.div>
    </div>
  );
}
