"use client"

import { useState } from "react"
import { Mail, CheckCircle, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-float blur-xl"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-float blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 animate-glow">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Stay Ahead of Industry Trends</h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Get exclusive access to the latest updates on new products, industry insights, market trends, and special
              offers delivered directly to your inbox
            </p>
          </div>

          {!isSubscribed ? (
            <div className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your professional email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-4 pr-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold transition-all duration-300 hover:scale-105 animate-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Subscribe Now
                    </>
                  )}
                </Button>
              </form>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: "mdi:lightning-bolt", text: "Weekly Industry Updates", desc: "Latest market trends" },
                  { icon: "mdi:tag-multiple", text: "Exclusive Offers", desc: "Special discounts & deals" },
                  { icon: "mdi:chart-line", text: "Market Insights", desc: "Data-driven analysis" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm">{benefit.text}</div>
                      <div className="text-xs text-muted-foreground">{benefit.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-scale-pulse">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 animate-bounce-gentle">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">Welcome to Our Community!</h3>
              <p className="text-muted-foreground text-lg">
                Thank you for subscribing! You'll receive your first newsletter within 24 hours.
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-8 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
