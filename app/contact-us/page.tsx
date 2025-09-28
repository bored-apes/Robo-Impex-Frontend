"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ConnectivityAnimation } from "@/components/shared/common/animatedBackgroundIcons";
import { contactMethods } from "@/data/constants";

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
  scale: 1.02,
  transition: { duration: 0.3 },
};

export default function ContactUsPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-4 sm:py-6 md:py-8 lg:py-10 relative overflow-hidden">
        <ConnectivityAnimation />

        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#38b6ff]">
              Get Connected
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
              Ready to transform your industrial operations? Our experts at Robo
              Impox are here to help you find the perfect connectivity solutions
              for your business needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={hoverEffect}
                className="iot-device"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover-lift glass-morphism">
                  <CardContent className="p-2 sm:p-3 md:p-4 lg:p-5 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 rounded-2xl ${method.bgColor} mb-1 sm:mb-2 md:mb-3`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <method.icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${method.color}`} />
                    </motion.div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-1 md:mb-2">
                      {method.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-1 sm:mb-1 md:mb-2">
                      {method.description}
                    </p>
                    <p className="font-medium text-xs sm:text-sm md:text-base lg:text-lg">{method.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-4 sm:py-6 md:py-8 lg:py-12 bg-muted/30 circuit-pattern">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3">
              Visit Our Hub
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg">
              Located in the heart of Surat's industrial innovation center
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="overflow-hidden border-2 glass-morphism">
              <div className="relative h-48 sm:h-60 md:h-72 lg:h-96 bg-muted/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8004.208929795134!2d72.89970959116954!3d21.238245480668525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0450010ff7451%3A0x49cb9ab83002a4f7!2sShyamdham%20Mandir!5e1!3m2!1sen!2sin!4v1759062153354!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
                
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
