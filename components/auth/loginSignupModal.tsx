"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Phone, LogIn, UserPlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Icon } from "@iconify/react"
import { LoginFormData, SignupFormData } from "@/types/user"

interface LoginSignupModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "signup"
}

export function LoginSignupModal({ isOpen, onClose, initialMode = "login" }: LoginSignupModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupData, setSignupData] = useState<SignupFormData>({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Login data:", loginData)
    setIsLoading(false)
    onClose()
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Signup data:", signupData)
    setIsLoading(false)
    onClose()
  }

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-2 border-border/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            className="absolute top-4 right-4 w-8 h-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Icon icon="mdi:chip" className="w-full h-full text-primary" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Icon icon="mdi:memory" className="w-full h-full text-primary" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Icon icon="mdi:cpu-64-bit" className="w-full h-full text-primary" />
          </motion.div>
        </div>

        <div className="relative z-10">
          <DialogHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <motion.img
                  src="/logo_transparent.png"
                  alt="RoboImpax Logo"
                  className="h-8 w-10"
                  whileHover={{ rotate: 5 }}
                />
                <div>
                  <DialogTitle className="text-xl font-bold text-gradient">Welcome to RoboImpax</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {mode === "login" ? "Sign in to your account" : "Create your account"}
                  </p>
                </div>
              </motion.div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 input-focus-effect"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 input-focus-effect"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={loginData.rememberMe}
                        onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm text-primary">
                      Forgot password?
                    </Button>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full btn-hover-effect" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignupSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className="text-sm font-medium">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="First name"
                          value={signupData.firstname}
                          onChange={(e) => setSignupData({ ...signupData, firstname: e.target.value })}
                          className="pl-10 input-focus-effect"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-lastname"
                          type="text"
                          placeholder="Last name"
                          value={signupData.lastname}
                          onChange={(e) => setSignupData({ ...signupData, lastname: e.target.value })}
                          className="pl-10 input-focus-effect"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 input-focus-effect"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-mobile" className="text-sm font-medium">
                      Mobile Number (Optional)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={signupData.mobile}
                        onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                        className="pl-10 input-focus-effect"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 input-focus-effect"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10 input-focus-effect"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full btn-hover-effect" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  className="p-0 ml-1 h-auto text-sm text-primary font-medium"
                  onClick={switchMode}
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
