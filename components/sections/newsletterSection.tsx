"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AnimatedNewsLetterSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons";

export function NewsletterSection(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-8 lg:px-12 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      <AnimatedNewsLetterSectionBackgroundIcons />

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto text-center"
        >
          <div className="mb-4 sm:mb-6 md:mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#38b6ff] to-[#38b6ff]/80 rounded-2xl mb-3 sm:mb-4 md:mb-6"
            >
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/70 bg-clip-text text-transparent">
              Stay Ahead of Industry Trends
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-md sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed">
              Get exclusive access to the latest updates on new products, industry insights, market trends, and special offers delivered directly to your inbox
            </p>
          </div>

          {!isSubscribed ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-3 sm:mb-4 md:mb-6"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-3 sm:pl-4 pr-10 sm:pr-12 h-10 sm:h-12 md:h-14 text-xs sm:text-sm md:text-base bg-background/80 backdrop-blur-sm border-2 focus:border-[#38b6ff] transition-all duration-300 w-full"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground" />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 bg-[#38b6ff] hover:bg-[#38b6ff]/90 w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <>
                    <Send className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    Subscribe Now
                  </>
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-500 rounded-full mb-3 sm:mb-4 md:mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                </motion.div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 mb-2 sm:mb-3 md:mb-4">
                Welcome to Our Community!
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Thank you for subscribing! You'll receive your first newsletter within 24 hours.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}