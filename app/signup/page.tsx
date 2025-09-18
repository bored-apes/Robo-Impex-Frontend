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
import { tokenManager } from "@/lib/tokenManager";
import { signupUser } from "@/lib/apiServices/auth.service";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const { showToast } = useCustomToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signupUser(formData);

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
          message: response.message || "Failed to create account",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedProductSectionBackgroundIcons />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-scale-pulse" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Vector Illustration Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col items-center justify-center space-y-8"
        >
          {/* Animated Factory Vector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="w-80 h-80 relative">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                {/* Factory Building */}
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
                {/* Smokestacks */}
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
                {/* Animated Smoke */}
                <motion.circle
                  cx="90"
                  cy="110"
                  r="8"
                  fill="currentColor"
                  className="text-muted-foreground opacity-60"
                  animate={{ y: [0, -20, -40], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.circle
                  cx="230"
                  cy="90"
                  r="10"
                  fill="currentColor"
                  className="text-muted-foreground opacity-60"
                  animate={{ y: [0, -25, -50], opacity: [0.6, 0.3, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
                {/* Windows */}
                <motion.rect
                  x="70"
                  y="200"
                  width="15"
                  height="15"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.rect
                  x="120"
                  y="200"
                  width="15"
                  height="15"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                />
                <motion.rect
                  x="185"
                  y="200"
                  width="15"
                  height="15"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 2,
                  }}
                />
                <motion.rect
                  x="235"
                  y="200"
                  width="15"
                  height="15"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
                {/* Conveyor Belt */}
                <motion.rect
                  x="60"
                  y="260"
                  width="200"
                  height="8"
                  rx="4"
                  fill="currentColor"
                  className="text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
                {/* Moving Boxes */}
                <motion.rect
                  x="80"
                  y="250"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ x: [80, 240, 80] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <motion.rect
                  x="140"
                  y="250"
                  width="12"
                  height="12"
                  rx="2"
                  fill="currentColor"
                  className="text-accent"
                  animate={{ x: [140, 300, 140] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: 1,
                  }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold text-foreground text-balance">
              Join the Future of <span className="text-gradient">Industry</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-md">
              Connect with leading industrial automation solutions and transform
              your business operations.
            </p>
          </motion.div>
        </motion.div>

        {/* Signup Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="glass-morphism border shadow-xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center animate-glow">
                  <UserPlus className="w-8 h-8 text-primary-foreground" />
                </div>
              </motion.div>

              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Create Account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Start your industrial automation journey
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="firstname"
                      className="text-sm font-medium text-foreground"
                    >
                      First Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="First name"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        className="pl-10 h-11 focus-ring transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="lastname"
                      className="text-sm font-medium text-foreground"
                    >
                      Last Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="pl-10 h-11 focus-ring transition-all duration-300"
                        required
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11 focus-ring transition-all duration-300"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="mobile"
                    className="text-sm font-medium text-foreground"
                  >
                    Mobile Number
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="pl-10 h-11 focus-ring transition-all duration-300"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 focus-ring transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-hover-grow transition-all duration-300 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                      Sign In
                    </Link>
                  </p>
                </motion.div>
              </form>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
