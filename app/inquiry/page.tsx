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
import { Product } from "@/types/produt";
import { CommunicationAnimation } from "@/components/shared/common/animatedBackgroundIcons";

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
    (productsData as Product[]).slice(0, 10)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredProducts((productsData as Product[]).slice(0, 10));
    } else {
      const filtered = (productsData as Product[]).filter((product: Product) =>
        product.name.toLowerCase().includes(term)
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

  const officeLocation = [
    {
      city: "Surat Office",
      address: "105, Dhara Arcade, Mota Varachha, Surat, Gujarat - 394101",
      phone: "+91 77780 81772",
      hours: "Mon-Sat: 9AM-6PM IST",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-background px-4 sm:px-12 lg:px-20 py-16 circuit-pattern">
      <CommunicationAnimation />

      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient py-2">
          {" "}
          Product Inquiry
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Interested in our products? Fill out the form below and our team will
          provide you with detailed information, pricing, and technical
          specifications for your industrial automation needs.
        </p>
      </motion.div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Icon
                        icon="mdi:form-select"
                        className="h-6 w-6 mr-2 text-primary animate-circuit-pulse"
                      />
                      Product Inquiry Form
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Provide details about the products you're interested in,
                      and our experts will get back to you with comprehensive
                      information and connectivity solutions.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className="form-field-glow"
                            required
                          />
                          <div className="field-circuit h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="Enter your email"
                            className="form-field-glow"
                            required
                          />
                          <div className="field-circuit h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            placeholder="Enter your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product">Product Interest</Label>
                          <Select
                            value={formData.product}
                            onValueChange={(value) =>
                              handleInputChange("product", value)
                            }
                          >
                            <SelectTrigger className="w-full h-12 px-4 py-3 text-base border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200">
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
                              <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-3 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                                  className="w-full"
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                  onClick={(e) => e.stopPropagation()}
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                              </div>
                              <div className="p-1">
                                {filteredProducts.length > 0 ? (
                                  filteredProducts.map((product: Product) => (
                                    <SelectItem
                                      key={product.id}
                                      value={product.id}
                                      className="px-3 py-2 text-base rounded-md focus:bg-[#38b6ff] dark:focus:bg-[#38b6ff]/20 transition-colors duration-150 cursor-pointer relative group"
                                    >
                                      <div className="truncate w-full">
                                        {product.name}
                                      </div>
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                                    No products found matching "{searchTerm}"
                                  </div>
                                )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Estimated Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min={1}
                            value={formData.quantity}
                            onChange={(e) =>
                              handleInputChange("quantity", e.target.value)
                            }
                            placeholder="Enter quantity needed"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Specific Requirements *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Tell us about your specific requirements, technical specifications needed, intended use, timeline, and any questions you have..."
                          required
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          className="w-full btn-iot animate-glow"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing Inquiry...</span>
                            </div>
                          ) : (
                            <>
                              <Send className="h-5 w-5 mr-2" />
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

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {officeLocation.map((office, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h4 className="font-semibold text-primary">
                          {office.city}
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{office.address}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{office.phone}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{office.hours}</span>
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Why Inquire With Us?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.text}</div>
                          <div className="text-xs text-muted-foreground">
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
