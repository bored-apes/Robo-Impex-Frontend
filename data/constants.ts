import { Headphones, Mail, MessageCircle, Phone } from "lucide-react";

export const SITE = {
  NAME: "Robo Impex",
  URL: process.env.NEXT_PUBLIC_SITE_URL || "https://roboimpex.com",
  DESCRIPTION:
    "Leading B2B marketplace for industrial machinery, equipment, and manufacturing solutions",
  KEYWORDS: [
    "industrial machinery",
    "B2B marketplace",
    "manufacturing equipment",
    "suppliers",
  ],
  TAGLINE: "Industrial Solutions",
};

export const CONTACT = {
  ADDRESS: "105, Dhara Arcade, Mota Varachha, Surat, Gujarat - 394101",
  PHONE: "+91 77780 81772",
  EMAIL: "info.roboimpex@gmail.com",
  SUPPORT_EMAIL: "support.roboimpex@gmail.com",
  SALES_EMAIL: "sales.roboimpex@gmail.com",
  BUSINESS_HOURS: "Mon-Sat: 9AM-6PM IST",
};

export const SOCIAL = {
  FACEBOOK: "#",
  TWITTER: "#",
  LINKEDIN: "#",
  YOUTUBE: "#",
  INSTAGRAM: "#",
};

export const FEATURES = {
  ENABLE_WISHLIST: true,
  ENABLE_CART: true,
  ENABLE_REVIEWS: true,
  ENABLE_COMPARISON: true,
  ENABLE_NEWSLETTER: true,
};

export const CURRENCY = {
  CODE: "INR",
  SYMBOL: "₹",
  LOCALE: "en-IN",
};

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  REVIEWS_PER_PAGE: 5,
  ORDERS_PER_PAGE: 10,
};

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export const CATEGORIES = [
  {
    id: "plastic-machinery",
    name: "Plastic Machinery",
    icon: "mdi:factory",
    description: "Injection molding, extrusion, and blow molding machines",
  },
  {
    id: "packaging-machinery",
    name: "Packaging Machinery",
    icon: "mdi:package-variant",
    description: "Filling, sealing, and labeling machines",
  },
  {
    id: "food-machinery",
    name: "Food Machinery",
    icon: "mdi:food",
    description: "Food processing and packaging equipment",
  },
  {
    id: "construction-machinery",
    name: "Construction Machinery",
    icon: "mdi:excavator",
    description: "Heavy construction and earthmoving equipment",
  },
  {
    id: "printing-machinery",
    name: "Printing Machinery",
    icon: "mdi:printer",
    description: "Digital and offset printing equipment",
  },
];

export const heroContent = {
  badge: "Premium Electronics Components",
  title: "Smart Electronics",
  subtitle: "For Innovation",
  description:
    "Discover cutting-edge Arduino boards, sensors, microcontrollers, and IoT components for your next innovative project.",
  stats: [
    { value: "10K+", label: "Components", icon: "mdi:chip" },
    { value: "500+", label: "Arduino Kits", icon: "mdi:developer-board" },
    { value: "50+", label: "Sensors", icon: "mdi:radar" },
  ],
};

export const stats = [
  {
    icon: "mdi:factory",
    value: 10000,
    suffix: "+",
    label: "Products Available",
    color: "text-[#38b6ff]",
    bgColor: "bg-[#38b6ff]/10",
  },
  {
    icon: "mdi:account-group",
    value: 2000,
    suffix: "+",
    label: "Verified Suppliers",
    color: "text-[#38b6ff]",
    bgColor: "bg-[#38b6ff]/10",
  },
  {
    icon: "mdi:earth",
    value: 40,
    suffix: "+",
    label: "Countries Served",
    color: "text-[#38b6ff]",
    bgColor: "bg-[#38b6ff]/10",
  },
  {
    icon: "mdi:star",
    value: 4.9,
    suffix: "/5",
    label: "Customer Rating",
    color: "text-[#38b6ff]",
    bgColor: "bg-[#38b6ff]/10",
  },
] as const;

export const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our experts",
    value: "+91 77780 81772",
    action: "tel:+917778081772",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a detailed inquiry",
    value: "info.roboimpex@gmail.com",
    action: "mailto:info.roboimpex@gmail.com",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    value: "Available 24/7",
    action: "#",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with installations",
    value: "support@roboimpox.com",
    action: "mailto:support@roboimpox.com",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
] as const;
