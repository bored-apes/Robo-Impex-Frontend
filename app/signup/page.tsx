"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedProductSectionBackgroundIcons } from "@/components/shared/common/animatedBackgroundIcons";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/components/shared/common/customToast";
import { signupUser } from "@/lib/apiServices/auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^\+?[1-9]\d{9,11}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useCustomToast();
  const router = useRouter();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    try {
      const { confirmPassword, ...payload } = values;

      const response = await signupUser(payload);

      if (response.success) {
        showToast({
          type: "success",
          title: "Account Created!",
          message:
            response.message ||
            "Welcome to RoboImpex! Your account has been created successfully.",
        });

        router.push("/login");
      } else {
        showToast({
          type: "error",
          title: "Signup Failed",
          message: "Failed to create account",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Signup Error",
        message: "Network error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 relative overflow-hidden">
      <AnimatedProductSectionBackgroundIcons />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 sm:-top-24 md:-top-30 -right-16 sm:-right-24 md:-right-30 w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-float" />
        <div
          className="absolute -bottom-16 sm:-bottom-24 md:-bottom-30 -left-16 sm:-left-24 md:-left-30 w-40 sm:w-52 md:w-64 h-40 sm:h-52 md:h-64 bg-accent/10 rounded-full blur-2xl sm:blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-secondary/5 rounded-full blur-2xl sm:blur-3xl animate-scale-pulse" />
      </div>

      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col items-center justify-center space-y-4 sm:space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-80 relative">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <motion.rect
                  x="40"
                  y="180"
                  width="240"
                  height="120"
                  rx="10"
                  fill="currentColor"
                  className="text-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.rect
                  x="80"
                  y="120"
                  width="20"
                  height="60"
                  rx="10"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                />
                <motion.rect
                  x="220"
                  y="100"
                  width="20"
                  height="80"
                  rx="10"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                />
                <motion.circle
                  cx="90"
                  cy="110"
                  r="6"
                  fill="currentColor"
                  className="text-muted-foreground opacity-60"
                  animate={{ y: [0, -15, -30], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.circle
                  cx="230"
                  cy="90"
                  r="8"
                  fill="currentColor"
                  className="text-muted-foreground opacity-60"
                  animate={{ y: [0, -20, -40], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <motion.rect
                  x="70"
                  y="200"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.rect
                  x="120"
                  y="200"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
                <motion.rect
                  x="185"
                  y="200"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                />
                <motion.rect
                  x="235"
                  y="200"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                />
                <motion.rect
                  x="60"
                  y="260"
                  width="200"
                  height="6"
                  rx="3"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
                <motion.rect
                  x="80"
                  y="250"
                  width="10"
                  height="10"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ x: [80, 240, 80] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.rect
                  x="140"
                  y="250"
                  width="10"
                  height="10"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ x: [140, 300, 140] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Join the Future of <span className="text-gradient">Industry</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground text-pretty max-w-xs sm:max-w-md">
              Connect with leading industrial automation solutions and transform your business operations.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        >
          <Card className="glass-morphism border shadow-xl">
            <CardHeader className="text-center space-y-2 sm:space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-primary rounded-2xl flex items-center justify-center animate-glow">
                  <UserPlus className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-primary-foreground" />
                </div>
              </motion.div>

              <div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  Create Account
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Start your industrial automation journey
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="space-y-1 sm:space-y-1.5"
                      >
                        <Label htmlFor="firstname" className="text-xs sm:text-sm font-medium text-foreground">
                          First Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                          <Field
                            id="firstname"
                            name="firstname"
                            type="text"
                            placeholder="First name"
                            as={Input}
                            className="pl-7 sm:pl-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                          />
                        </div>
                        <div>
                          <ErrorMessage name="firstname" component="div" className="text-xs text-red-500 mt-1" />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="space-y-1 sm:space-y-1.5"
                      >
                        <Label htmlFor="lastname" className="text-xs sm:text-sm font-medium text-foreground">
                          Last Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                          <Field
                            id="lastname"
                            name="lastname"
                            type="text"
                            placeholder="Last name"
                            as={Input}
                            className="pl-7 sm:pl-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                          />
                        </div>
                        <ErrorMessage name="lastname" component="div" className="text-xs text-red-500 mt-1" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="space-y-1 sm:space-y-1.5"
                    >
                      <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-foreground">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          as={Input}
                          className="pl-7 sm:pl-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="space-y-1 sm:space-y-1.5"
                    >
                      <Label htmlFor="mobile" className="text-xs sm:text-sm font-medium text-foreground">
                        Mobile Number
                      </Label>
                      <div className="relative group">
                        <Phone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                        <Field
                          id="mobile"
                          name="mobile"
                          type="tel"
                          placeholder="Enter your mobile number"
                          as={Input}
                          className="pl-7 sm:pl-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                        />
                      </div>
                      <ErrorMessage name="mobile" component="div" className="text-xs text-red-500 mt-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="space-y-1 sm:space-y-1.5"
                    >
                      <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-foreground">
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          as={Input}
                          className="pl-7 sm:pl-9 pr-7 sm:pr-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-3 sm:w-4 h-3 sm:h-4" /> : <Eye className="w-3 sm:w-4 h-3 sm:h-4" />}
                        </button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-xs text-red-500 mt-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="space-y-1 sm:space-y-1.5"
                    >
                      <Label htmlFor="confirmPassword" className="text-xs sm:text-sm font-medium text-foreground">
                        Confirm Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 sm:w-4 h-3 sm:h-4 group-focus-within:text-primary transition-colors" />
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          as={Input}
                          className="pl-7 sm:pl-9 pr-7 sm:pr-9 h-9 sm:h-10 focus-ring transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-3 sm:w-4 h-3 sm:h-4" /> : <Eye className="w-3 sm:w-4 h-3 sm:h-4" />}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500 mt-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full h-9 sm:h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-hover-grow transition-all duration-300 cursor-pointer text-xs sm:text-sm"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-2 sm:w-3 h-2 sm:h-3 mr-1 sm:mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-2 sm:w-3 h-2 sm:h-3 ml-1 sm:ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                          Sign In
                        </Link>
                      </p>
                    </motion.div>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-center mt-4 sm:mt-6"
          >
            <Link href="/" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
