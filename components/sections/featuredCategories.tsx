"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "@/data/constants";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { AnimatedFeatureCategoryBackgroundIcons } from "../shared/common/animatedBackgroundIcons";

export function FeaturedCategories(): JSX.Element {
  return (
    <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <AnimatedFeatureCategoryBackgroundIcons />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/70 bg-clip-text text-transparent">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of industrial machinery and
            equipment across multiple specialized categories
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group relative overflow-hidden border border-[#38b6ff]/20 bg-background/90 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#38b6ff]/10 hover:ring-2 hover:ring-[#38b6ff]/30 dark:hover:bg-background/95 cursor-pointer">
                <CardContent className="p-8 text-center relative">
                  <Link href="/" className="block">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#38b6ff]/5 to-[#38b6ff]/15 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#38b6ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>

                    <div className="relative z-10">
                      <div className="mb-6 relative">
                        <motion.div
                          className="relative"
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="absolute inset-0 bg-[#38b6ff]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <Icon
                            icon={category.icon}
                            className="h-16 w-16 mx-auto text-[#38b6ff] group-hover:text-[#38b6ff] relative z-10 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                          />
                        </motion.div>
                      </div>
                      <h3 className="font-semibold text-base group-hover:text-[#38b6ff] transition-all duration-500 mb-3 group-hover:font-bold">
                        {category.name}
                      </h3>
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-transparent via-[#38b6ff] to-transparent mx-auto"
                        initial={{ width: 0 }}
                        whileHover={{ width: "60%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/contact-us"
            className="text-[#38b6ff] hover:text-[#38b6ff]/80 font-semibold transition-colors duration-300 underline underline-offset-4"
          >
            Contact our specialists for custom solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
