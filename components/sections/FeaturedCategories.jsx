"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { CATEGORIES } from "@/data/constants"
import { Card, CardContent } from "../ui/card"

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full animate-rotate-slow"></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 border border-accent rounded-full animate-rotate-slow"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of industrial machinery and equipment across multiple specialized
            categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {CATEGORIES.map((category, index) => (
            <Card
              key={category.id}
              className="group relative overflow-hidden border-none bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center relative">
                <Link href="/" className="block">
                  {/* Background Glow Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-6 relative">
                      <Icon
                        icon={category.icon}
                        className="h-16 w-16 mx-auto text-primary group-hover:text-accent transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-base group-hover:text-accent transition-colors duration-300 mb-2">
                      {category.name}
                    </h3>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto group-hover:w-1/2 transition-all duration-300"></div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
          <Link
            href="/contact-us"
            className="text-primary hover:text-accent font-semibold transition-colors duration-300 underline underline-offset-4"
          >
            Contact our specialists for custom solutions
          </Link>
        </div>
      </div>
    </section>
  )
}