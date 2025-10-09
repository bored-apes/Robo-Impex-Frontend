"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LEGAL, PRIVACY_SECTIONS } from "@/data/constants";
import { AnimatedHeroSectionBackgroundIcons } from "@/components/shared/common/animatedBackgroundIcons";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden py-4 sm:py-5 md:py-6 lg:py-8 bg-gradient-to-br from-muted/30 via-background to-accent/5 rounded-lg">
        <AnimatedHeroSectionBackgroundIcons />
        <div className="relative z-10 container mx-auto">
          <Breadcrumb className="mb-3 sm:mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Content */}
      <section className="py-3 sm:py-4 md:py-5 lg:py-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left: Summary */}
          <Card className="p-4 sm:p-6 lg:sticky lg:top-24 h-fit bg-card/90 backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Overview</h2>
            <p className="text-sm text-muted-foreground">
              We collect data to process your orders, improve your experience,
              and keep your account secure. You control your marketing
              preferences and can exercise your data rights anytime.
            </p>
            <Separator className="my-4" />
            <ul className="grid gap-2 text-sm list-disc pl-5 text-muted-foreground">
              <li>Account and order information</li>
              <li>Cookies for auth, cart, and analytics</li>
              <li>No selling of personal data</li>
              <li>Secure payment processing</li>
            </ul>
          </Card>

          {/* Right: Sections */}
          <div className="lg:col-span-2 grid gap-4 sm:gap-6">
            {PRIVACY_SECTIONS.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-4 sm:p-6">
                  <h3
                    id={section.id}
                    className="text-lg sm:text-xl font-semibold mb-3"
                  >
                    {section.title}
                  </h3>
                  <ul className="grid gap-2 text-sm sm:text-base text-muted-foreground list-disc pl-5">
                    {section.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}

            <p className="text-xs sm:text-sm text-muted-foreground">
              Questions?{" "}
              <Link
                href={`mailto:${LEGAL.CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {LEGAL.CONTACT_EMAIL}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
