"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { PRODUCT_CATEGORIES } from "@/data/constants";
import { Card, CardContent } from "../ui/card";
import { useRef } from "react";
import type { JSX } from "react/jsx-runtime";

const categoryIcons = {
  Semiconductor: "mdi:chip",
  IoT: "mdi:wifi",
  Robotics: "mdi:robot",
  Power: "mdi:lightning-bolt",
  Industrial: "mdi:factory",
};

export function FeaturedCategories(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(90deg,rgba(56,182,255,0.1)_1px,transparent_1px),linear-gradient(rgba(56,182,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px] md:bg-[size:60px_60px]" />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 relative z-10 w-full">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 w-full opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 w-full bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent text-center">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl w-full text-center">
            Discover our comprehensive range of electronics components across
            specialized categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] hover:scale-105 hover:-translate-y-2 transition-all duration-300 w-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="group relative overflow-hidden border border-primary/20 bg-background/90 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:ring-2 hover:ring-primary/30 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>

                <CardContent className="p-4 sm:p-6 md:p-8 text-center relative w-full">
                  <Link
                    href="/products"
                    className="block w-full"
                    onClick={() => {
                      sessionStorage.setItem("selectedCategory", category.id);
                    }}
                  >
                    <div className="relative z-10 w-full">
                      <div className="mb-4 sm:mb-6 w-full relative">
                        <div className="relative group-hover:scale-125 transition-transform duration-300 w-full flex justify-center">
                          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                          <Icon
                            icon={
                              categoryIcons[
                                category.id as keyof typeof categoryIcons
                              ]
                            }
                            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto text-primary group-hover:text-primary relative z-10 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                          />
                        </div>
                      </div>

                      <h3 className="font-semibold text-sm sm:text-base md:text-lg group-hover:text-primary transition-all duration-500 mb-2 sm:mb-3 w-full text-center group-hover:font-bold">
                        {category.name}
                      </h3>

                      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto w-0 group-hover:w-3/5 transition-all duration-400 " />
                      <div className="h-px bg-primary/50 mx-auto mt-1 opacity-0 group-hover:opacity-100 w-0 group-hover:w-2/5 transition-all duration-600 delay-200" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 md:mt-16 w-full opacity-0 animate-[fadeIn_0.6s_ease-out_0.8s_forwards]">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-3 sm:mb-4 w-full text-center">
            Can't find what you're looking for?
          </p>
          <Link
            href="/contact-us"
            className="text-primary hover:text-primary/80 font-semibold text-sm sm:text-base md:text-lg transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8 hover:scale-105 inline-block w-full text-center "
          >
            Contact our specialists for custom solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
