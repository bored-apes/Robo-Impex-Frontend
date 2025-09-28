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
  ArrowRight,
  Loader2,
  Zap,
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
import { AnimatedHeroSectionBackgroundIcons } from "@/components/shared/common/animatedBackgroundIcons";
import { useRouter } from "next/navigation";
import { useCustomToast } from "@/components/shared/common/customToast";
import { loginUser } from "@/lib/apiServices/auth.service";
import { useAuth } from "@/context/authContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useCustomToast();
  const router = useRouter();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    try {
      const response = await loginUser(values);

      if (response.success && response.token && response.user) {
        login(response.token, response.user);

        showToast({
          type: "success",
          title: "Welcome back!",
          message: "You have been successfully logged in.",
        });
        router.push("/cart");
      } else {
        showToast({
          type: "error",
          title: "Login Failed",
          message: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        title: "Connection Error",
        message: "Unable to connect to server. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 relative overflow-hidden">
      <AnimatedHeroSectionBackgroundIcons />
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
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 320 320" className="w-full h-full">
                  <motion.rect
                    x="120"
                    y="40"
                    width="80"
                    height="60"
                    rx="15"
                    fill="currentColor"
                    className="text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.circle
                    cx="140"
                    cy="65"
                    r="6"
                    fill="currentColor"
                    className="text-background"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.circle
                    cx="180"
                    cy="65"
                    r="6"
                    fill="currentColor"
                    className="text-background"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                  />
                  <motion.rect
                    x="100"
                    y="120"
                    width="120"
                    height="100"
                    rx="20"
                    fill="currentColor"
                    className="text-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  />
                  <motion.rect
                    x="60"
                    y="140"
                    width="24"
                    height="48"
                    rx="12"
                    fill="currentColor"
                    className="text-accent"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.rect
                    x="230"
                    y="140"
                    width="24"
                    height="48"
                    rx="12"
                    fill="currentColor"
                    className="text-accent"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.rect
                    x="120"
                    y="240"
                    width="20"
                    height="48"
                    rx="10"
                    fill="currentColor"
                    className="text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                  <motion.rect
                    x="175"
                    y="240"
                    width="20"
                    height="48"
                    rx="10"
                    fill="currentColor"
                    className="text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Welcome Back to <span className="text-gradient">RoboImpex</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground text-pretty max-w-xs sm:max-w-md">
              Continue your journey in industrial automation and robotics excellence.
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
                  <Zap className="w-5 sm:w-6 md:w-8 h-5 sm:h-6 md:h-8 text-primary-foreground" />
                </div>
              </motion.div>

              <div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  Sign In
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  Access your industrial automation dashboard
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
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
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
                      transition={{ delay: 0.5, duration: 0.5 }}
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
                          placeholder="Enter your password"
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
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex justify-end"
                    >
                      <Link href="/forgot-password" className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                        Forgot password?
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full h-9 sm:h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-hover-grow transition-all duration-300 cursor-pointer text-xs sm:text-sm"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-2 sm:w-3 h-2 sm:h-3 mr-1 sm:mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="w-2 sm:w-3 h-2 sm:h-3 ml-1 sm:ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                          Create Account
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
            animate={{ opacity: 1}}
            transition={{ delay: 1, duration: 0.5 }}
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
