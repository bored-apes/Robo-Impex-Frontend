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
    <div className="min-h-screen bg-background px-4 sm:px-12 lg:px-20 ">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 relative overflow-hidden">
        <ConnectivityAnimation />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#38b6ff]">
              Get Connected
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Ready to transform your industrial operations? Our experts at Robo
              Impox are here to help you find the perfect connectivity solutions
              for your business needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
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
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover-lift">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${method.bgColor} mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <method.icon className={`h-8 w-8 ${method.color}`} />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <p className="font-medium text-sm">{method.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 circuit-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Visit Our Hub</h2>
            <p className="text-muted-foreground text-lg">
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
              <div className="relative h-96 bg-muted/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.122213129299!2d72.8622141750811!3d21.2306444806871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f3f12b5e2c5%3A0x5a1e6c0e1c1b1b1d!2sMota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1635959542742!5m2!1sen!2sin"
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
