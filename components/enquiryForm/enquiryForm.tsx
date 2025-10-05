"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { Send, Loader2, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { useCustomToast } from "@/components/shared/common/customToast";
import { enquiryService } from "@/lib/apiServices/enquiry.service";
import type { APIProduct } from "@/types/products";

interface EnquiryFormProps {
  products: APIProduct[];
  selectedProductId?: number;
  className?: string;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w-.]+@([\w-]+\.)+(com|net|org|in|co|edu|gov|info|biz|io|me)$/i,
      "Email must end with a valid domain like .com, .net, etc."
    )
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid mobile number format")
    .optional(),
  quantity: Yup.number().min(1, "Quantity must be at least 1"),
  message: Yup.string().min(10, "Message must be at least 10 characters"),
});

export function EnquiryForm({
  products,
  selectedProductId,
  className,
  isLoading,
}: EnquiryFormProps) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useCustomToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLoading, setIsDropdownLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      mobile: "",
      productId: selectedProductId || 0,
      quantity: 1,
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const enquiryData = {
          productId: values.productId,
          userId: user?.id ?? null,
          quantity: values.quantity,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          message: values.message,
        };

        const response = await enquiryService.createEnquiry(enquiryData);

        if (response.success) {
          showToast({
            type: "success",
            title: "Enquiry Submitted",
            message:
              "Your enquiry has been submitted successfully. We'll get back to you within 24 hours.",
          });
          resetForm();
        } else {
          showToast({
            type: "error",
            title: "Submission Failed",
            message:
              response.message || "Failed to submit enquiry. Please try again.",
          });
        }
      } catch (error) {
        showToast({
          type: "error",
          title: "Error",
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      formik.setValues({
        ...formik.values,
        name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [isAuthenticated, user, formik.setValues]);

  const handleDropdownOpen = (open: boolean) => {
    setIsDropdownOpen(open);
    
    if (open && products.length === 0) {
      setIsDropdownLoading(true);
      
      const timer = setTimeout(() => {
        setIsDropdownLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsDropdownLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const DropdownSkeleton = () => (
    <div className="p-2 space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-2 rounded-md animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  const ProductList = () => {
    if (isDropdownLoading) {
      return <DropdownSkeleton />;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="p-4 text-center">
          <div className="text-muted-foreground">
            <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium mb-1">
              {products.length === 0 ? "No products available" : "No products found"}
            </p>
            <p className="text-xs">
              {searchTerm ? (
                <>
                  No results for "<span className="font-medium">{searchTerm}</span>"
                </>
              ) : (
                "Start typing to search products"
              )}
            </p>
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="max-h-[200px] overflow-y-auto">
        {filteredProducts.map((product) => (
          <SelectItem
            key={product.id}
            value={product.id.toString()}
            className="px-2 py-2 rounded-md focus:bg-primary/10 hover:bg-muted/50 transition-colors cursor-pointer text-sm"
          >
            <div className="font-medium truncate">{product.name}</div>
          </SelectItem>
        ))}
      </div>
    );
  };

  return (
    <Card
      className={`glass-morphism border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center">
          <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary animate-pulse" />
          Product Enquiry Form
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Fill out the form below to get detailed information about our products
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 md:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading products...
            </span>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  className="form-field-glow h-10 sm:h-11"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-xs sm:text-sm text-destructive">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                  className="form-field-glow h-10 sm:h-11"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs sm:text-sm text-destructive">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your mobile number"
                  className="h-10 sm:h-11"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-xs sm:text-sm text-destructive">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="productId" className="text-sm font-medium">
                  Product Interest *
                </Label>
                <Select
                  value={formik.values.productId.toString()}
                  onValueChange={(value) =>
                    formik.setFieldValue("productId", Number.parseInt(value))
                  }
                  disabled={formik.isSubmitting}
                  onOpenChange={handleDropdownOpen}
                >
                  <SelectTrigger className="w-full h-10 sm:h-11 text-left">
                    <SelectValue placeholder="Select a product" />
                    {(isDropdownLoading || isLoading) && (
                      <Loader2 className="h-4 w-4 animate-spin ml-2" />
                    )}
                  </SelectTrigger>
                  <SelectContent
                    className="w-[var(--radix-select-trigger-width)] max-h-[300px] p-0 z-50"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    position="popper"
                  >
                    <div className="sticky top-0 bg-background border-b z-10">
                      <div className="p-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            Search Products
                          </span>
                          {!isDropdownLoading && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                              {filteredProducts.length} found
                            </span>
                          )}
                        </div>

                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            ref={searchInputRef}
                            placeholder="Type to search products..."
                            className="w-full h-8 pl-8 pr-8 text-sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            disabled={isDropdownLoading}
                          />
                          {searchTerm && !isDropdownLoading && (
                            <button
                              type="button"
                              onClick={clearSearch}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <ProductList />
                  </SelectContent>
                </Select>
                {formik.touched.productId && formik.errors.productId && (
                  <p className="text-xs sm:text-sm text-destructive">
                    {formik.errors.productId}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Estimated Quantity *
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter quantity needed"
                  className="h-10 sm:h-11"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="text-xs sm:text-sm text-destructive">
                    {formik.errors.quantity}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Specific Requirements *
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tell us about your specific requirements, technical specifications needed, intended use, timeline, and any questions you have..."
                className="resize-none"
                disabled={formik.isSubmitting}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-xs sm:text-sm text-destructive">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-sm sm:text-base font-medium"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}