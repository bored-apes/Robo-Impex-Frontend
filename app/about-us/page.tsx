"use client";

import { Card, CardContent } from "@/components/ui/card";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { SITE } from "@/data/constants";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

export default function AboutUsPage(): React.ReactElement {
  const timeline = [
    {
      year: "2010",
      event: "Company founded with a vision to revolutionize industrial equipment supply",
      icon: "mdi:rocket-launch",
    },
    {
      year: "2015",
      event: "Expanded to serve 50+ countries worldwide",
      icon: "mdi:earth",
    },
    {
      year: "2018",
      event: "Launched digital marketplace platform",
      icon: "mdi:cloud-upload",
    },
    {
      year: "2020",
      event: "Achieved ISO 9001:2015 certification",
      icon: "mdi:certificate",
    },
    {
      year: "2023",
      event: "Reached 10,000+ verified suppliers milestone",
      icon: "mdi:trophy",
    },
  ] as const;

  const values = [
    {
      icon: "mdi:shield-check",
      title: "Quality Assurance",
      description: "Every device undergoes rigorous quality checks and supplier verification.",
    },
    {
      icon: "mdi:handshake",
      title: "Trust & Reliability",
      description: "Building long-term partnerships with suppliers and customers worldwide.",
    },
    {
      icon: "mdi:rocket-launch",
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology.",
    },
    {
      icon: "mdi:earth",
      title: "Global Connectivity",
      description: "Connecting businesses across continents with seamless solutions.",
    },
  ] as const;

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
      description: "20+ years experience in industrial and B2B marketplaces.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
      description: "Technology leader with expertise in scalable platform development.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=200&width=200",
      description: "Supply chain expert ensuring smooth global operations.",
    },
    {
      name: "Emily Davis",
      role: "Head of Quality",
      image: "/placeholder.svg?height=200&width=200",
      description: "Quality assurance specialist with manufacturing background.",
    },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12">
      <main className="flex-1">
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gradient leading-tight">
              About {SITE.NAME}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              {SITE.DESCRIPTION} We connect businesses worldwide with trusted suppliers and cutting-edge industrial equipment.
            </p>
          </motion.div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-muted/30 circuit-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Our Core Values</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">The principles that drive our innovation</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp} className="iot-device w-full">
                  <Card className="text-center hover:shadow-lg transition-shadow border-2 h-full hover-lift glass-morphism">
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Icon icon={value.icon} className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mx-auto text-primary mb-3 sm:mb-4 animate-circuit-pulse" />
                      </motion.div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Our Innovation Journey</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">Key milestones in our evolution story</p>
            </motion.div>

            <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                    <Badge variant="default" className="text-xs sm:text-sm md:text-lg px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 whitespace-nowrap">
                      {item.year}
                    </Badge>
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon icon={item.icon} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </motion.div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Meet Our Experts</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">The innovators behind our success</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {team.map((member, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={hoverEffect} className="iot-device w-full">
                  <Card className="text-center hover:shadow-lg transition-shadow border-2 h-full hover-lift glass-morphism">
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <motion.div whileHover={{ scale: 1.05, rotate: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-4 border-primary/20"
                        />
                      </motion.div>
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">{member.role}</p>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-8 sm:py-12 md:py-16 bg-muted/30 circuit-pattern">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Innovate?</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 leading-relaxed">
                Join thousands of businesses worldwide who trust us for their industrial equipment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto">
                <Link href="/products">
                  <motion.button
                    className="btn-iot inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[#fff] rounded-lg w-full sm:w-auto text-xs sm:text-sm md:text-base text-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Products
                  </motion.button>
                </Link>
                <Link href="/inquiry" className="inline-flex w-full sm:w-auto">
                  <motion.div
                    className="btn-connect inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[#fff] rounded-lg w-full sm:w-auto text-xs sm:text-sm md:text-base text-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect With Us
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}