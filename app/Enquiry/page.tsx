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

export default function EnquiryPage(): ReactElement {
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
    <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 circuit-pattern">
      <CommunicationAnimation />

      <motion.div
        className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 text-primary py-1 sm:py-2">
          Product Enquiry
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          Interested in our products? Fill out the form below and our team will
          provide you with detailed information, pricing, and technical
          specifications for your industrial automation needs.
        </p>
      </motion.div>

      <section className="relative z-10">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <EnquiryForm products={products} isLoading={isLoading} />
              </motion.div>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-morphism border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-1 sm:pb-2 md:pb-3">
                    <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl flex items-center space-x-1 sm:space-x-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                      <span>Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-3 md:p-4">
                    <motion.div
                      className="space-y-1 sm:space-y-2 p-2 sm:p-3 md:p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-semibold text-primary text-xs sm:text-sm md:text-base">
                        {CONTACT.CITY}
                      </h4>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                        <p className="flex items-start space-x-1 sm:space-x-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mt-0.5 flex-shrink-0" />
                          <span>{CONTACT.ADDRESS}</span>
                        </p>
                        <p className="flex items-center space-x-1 sm:space-x-2">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                          <span>{CONTACT.PHONE}</span>
                        </p>
                        <p className="flex items-center space-x-1 sm:space-x-2">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
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
                  <CardHeader className="pb-1 sm:pb-2 md:pb-3">
                    <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl">
                      Why Inquire With Us?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-3 md:p-4">
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
                        className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-1 sm:p-2 bg-primary/10 rounded-lg">
                          <item.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-xs sm:text-sm md:text-base">
                            {item.text}
                          </div>
                          <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
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
