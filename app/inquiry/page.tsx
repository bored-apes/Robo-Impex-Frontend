"use client";

import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  Award,
  Users,
  Headphones,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { APIProduct } from "@/types/products";
import { CommunicationAnimation } from "@/components/shared/common/animatedBackgroundIcons";
import { CONTACT } from "@/data/constants";
import { EnquiryForm } from "@/components/enquiryForm/enquiryForm";
import { getProducts } from "@/lib/apiServices/product.service";

export default function InquiryPage(): ReactElement {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ pageSize: 100000 });
        if (response.success && response.data && "data" in response.data) {
          setProducts(response.data.data);
        } else {
          console.error("Failed to fetch products: No data returned");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 circuit-pattern">
      <CommunicationAnimation />

      <motion.div
        className="text-center mb-6 sm:mb-8 md:mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-primary py-2">
          Product Inquiry
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
          Interested in our products? Fill out the form below and our team will
          provide you with detailed information, pricing, and technical
          specifications for your industrial automation needs.
        </p>
      </motion.div>

      <section className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <EnquiryForm products={products} isLoading={isLoading} />
              </motion.div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-morphism border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center space-x-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <span>Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-4">
                    <motion.div
                      className="space-y-2 p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-semibold text-primary text-sm sm:text-base">
                        {CONTACT.CITY}
                      </h4>
                      <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        <p className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                          <span>{CONTACT.ADDRESS}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                          <span>{CONTACT.PHONE}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                          <span>{CONTACT.HOURS}</span>
                        </p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="glass-morphism border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">
                      Why Inquire With Us?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                    {[
                      {
                        icon: Award,
                        text: "Expert Guidance",
                        desc: "Get recommendations from industry experts",
                      },
                      {
                        icon: Users,
                        text: "Custom Solutions",
                        desc: "Tailored to your specific requirements",
                      },
                      {
                        icon: Globe,
                        text: "Global Sourcing",
                        desc: "Access to worldwide suppliers",
                      },
                      {
                        icon: Headphones,
                        text: "Technical Support",
                        desc: "Pre and post-sale assistance",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">
                            {item.text}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {item.desc}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}