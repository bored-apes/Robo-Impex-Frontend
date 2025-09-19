"use client";
import type React from "react";
import { useState } from "react";
import type { ReactElement } from "react";

import {
  Phone,
  MapPin,
  Send,
  Clock,
  Globe,
  Award,
  Users,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import productsData from "@/data/products.json";
import { Icon } from "@iconify/react";
import { Product } from "@/types/products";
import { CommunicationAnimation } from "@/components/shared/common/animatedBackgroundIcons";
import { CONTACT } from "@/data/constants";

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

export default function InquiryPage(): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    (productsData as unknown as Product[]).slice(0, 10)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredProducts((productsData as unknown as Product[]).slice(0, 10));
    } else {
      const filtered = (productsData as unknown as Product[]).filter(
        (product: Product) => product.name.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      "Inquiry submitted successfully! We'll get back to you within 24 hours."
    );
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      product: "",
      quantity: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 circuit-pattern">
      <CommunicationAnimation />

      <motion.div
        className="text-center mb-6 sm:mb-8 md:mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#38b6ff] py-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="sm:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center">
                      <Icon
                        icon="mdi:form-select"
                        className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-[#38b6ff] animate-circuit-pulse"
                      />
                      Product Inquiry Form
                    </CardTitle>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                      Provide details about the products you're interested in,
                      and our experts will get back to you with comprehensive
                      information and connectivity solutions.
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs sm:text-sm">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="form-field-glow h-9 sm:h-10 text-sm sm:text-base"
                            required
                          />
                          <div className="field-circuit h-1 bg-gradient-to-r from-[#38b6ff] to-accent rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs sm:text-sm">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="Enter your email"
                            className="form-field-glow h-9 sm:h-10 text-sm sm:text-base"
                            required
                          />
                          <div className="field-circuit h-1 bg-gradient-to-r from-[#38b6ff] to-accent rounded-full"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-xs sm:text-sm">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            placeholder="Enter your company name"
                            className="h-9 sm:h-10 text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="Enter your phone number"
                            className="h-9 sm:h-10 text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product" className="text-xs sm:text-sm">Product Interest</Label>
                          <Select
                            value={formData.product}
                            onValueChange={(value) =>
                              handleInputChange("product", value)
                            }
                          >
                            <SelectTrigger className="w-full h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#38b6ff] focus:border-transparent transition-all duration-200">
                              <SelectValue
                                placeholder="Select a product"
                                className="text-gray-500 dark:text-gray-400"
                              />
                            </SelectTrigger>
                            <SelectContent
                              className="w-[var(--radix-select-trigger-width)] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60"
                              position="popper"
                              sideOffset={5}
                            >
                              <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Search Products
                                  </span>
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                    {filteredProducts.length}{" "}
                                    {filteredProducts.length === 1
                                      ? "result"
                                      : "results"}
                                  </span>
                                </div>
                                <Input
                                  placeholder="Type to search products..."
                                  className="w-full h-9 sm:h-10 text-sm sm:text-base"
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                              </div>
                              <div className="p-1 sm:p-2">
                                {filteredProducts.length > 0 ? (
                                  filteredProducts.map((product: Product) => (
                                    <SelectItem
                                      key={product.id}
                                      value={product.id}
                                      className="px-3 py-2 text-sm sm:text-base rounded-md focus:bg-[#38b6ff] dark:focus:bg-[#38b6ff]/20 transition-colors duration-150 cursor-pointer"
                                    >
                                      <div className="truncate w-full">
                                        {product.name}
                                      </div>
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div className="px-3 sm:px-4 py-2 sm:py-3 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                    No products found matching "{searchTerm}"
                                  </div>
                                )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity" className="text-xs sm:text-sm">Estimated Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min={1}
                            value={formData.quantity}
                            onChange={(e) =>
                              handleInputChange("quantity", e.target.value)
                            }
                            placeholder="Enter quantity needed"
                            className="h-9 sm:h-10 text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs sm:text-sm">Specific Requirements *</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Tell us about your specific requirements, technical specifications needed, intended use, timeline, and any questions you have..."
                          className="text-sm sm:text-base"
                          required
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing Inquiry...</span>
                            </div>
                          ) : (
                            <>
                              <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                              Submit Inquiry
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center space-x-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff]" />
                      <span>Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-4">
                    <motion.div
                      className="space-y-2 p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="font-semibold text-[#38b6ff] text-sm sm:text-base">
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
                <Card className="glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300">
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
                        <div className="p-2 bg-[#38b6ff]/10 rounded-lg">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#38b6ff]" />
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{item.text}</div>
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