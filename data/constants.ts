import { Headphones, Mail, MessageCircle, Phone } from "lucide-react"

export const SITE = {
  NAME: "Robo Impex",
  URL: process.env.NEXT_PUBLIC_SITE_URL || "https://roboimpex.com",
  DESCRIPTION: "Leading B2B marketplace for industrial machinery, equipment, and manufacturing solutions",
  KEYWORDS: ["industrial machinery", "B2B marketplace", "manufacturing equipment", "suppliers"],
  TAGLINE: "Industrial Solutions",
}

export const CONTACT = {
  ADDRESS: "35, khodiyar krupa soc., shyamdham mandir, sarthana jakatnaka, surat - 395006",
  PHONE: "+91 72028 73950",
  EMAIL: "info.roboimpex@gmail.com",
  SUPPORT_EMAIL: "support.roboimpex@gmail.com",
  SALES_EMAIL: "sales.roboimpex@gmail.com",
  BUSINESS_HOURS: "Mon-Sat: 9AM-6PM IST",
  CITY: "Surat Office",
  HOURS: "Mon-Sat: 9AM-6PM IST",
}

export const SOCIAL = {
  TWITTER: "https://x.com/roboimpex",
  INSTAGRAM: "https://www.instagram.com/roboimpex/",
  WHATSAPP: "https://wa.me/7202873950",
  YOUTUBE: "https://www.youtube.com/channel/UC4-BWaS5NxoUzGUiHoiOVtA",
}

export const FEATURES = {
  ENABLE_WISHLIST: true,
  ENABLE_CART: true,
  ENABLE_REVIEWS: true,
  ENABLE_COMPARISON: true,
  ENABLE_NEWSLETTER: true,
}

export const CURRENCY = {
  CODE: "INR",
  SYMBOL: "₹",
  LOCALE: "en-IN",
}

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  REVIEWS_PER_PAGE: 5,
  ORDERS_PER_PAGE: 10,
}

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
]

export const CATEGORIES = [
  {
    id: "Mobile",
    name: "Mobile",
    icon: "mdi:cellphone",
    description: "Mobile phones and accessories",
  },
  {
    id: "Laptop",
    name: "Laptop",
    icon: "mdi:laptop",
    description: "Laptops and computer accessories",
  },
  {
    id: "Headphone",
    name: "Headphone",
    icon: "mdi:headphones",
    description: "Audio equipment and headphones",
  },
  {
    id: "Watch",
    name: "Watch",
    icon: "mdi:watch",
    description: "Smart watches and timepieces",
  },
]

// export const PRODUCT_TYPES = [
//   {
//     id: "Electronic",
//     name: "Electronic",
//     description: "Electronic devices and components",
//   },
//   {
//     id: "Mechanical",
//     name: "Mechanical",
//     description: "Mechanical parts and equipment",
//   },
//   {
//     id: "Software",
//     name: "Software",
//     description: "Software products and licenses",
//   },
// ]

export const PRODUCT_STATUS = [
  {
    id: "Active",
    name: "Active",
    description: "Currently available products",
  },
  {
    id: "Inactive",
    name: "Inactive",
    description: "Temporarily unavailable products",
  },
  {
    id: "Discontinued",
    name: "Discontinued",
    description: "No longer available products",
  },
]

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
}

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
] as const

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
] as const


export const PRODUCT_CATEGORIES = [
  { id: "Semiconductor", name: "Semiconductor" },
  { id: "IoT", name: "IoT" },
  { id: "Robotics", name: "Robotics" },
  { id: "Power", name: "Power" },
  { id: "Industrial", name: "Industrial" },
] as const;

export const PRODUCT_TYPES = [
  { id: "IC", name: "IC" },
  { id: "Microcontroller", name: "Microcontroller" },
  { id: "Sensor", name: "Sensor" },
  { id: "Module", name: "Module" },
  { id: "DevBoard", name: "DevBoard" },
  { id: "PCB", name: "PCB" },
  { id: "Connector", name: "Connector" },
  { id: "PowerSupply", name: "PowerSupply" },
  { id: "Display", name: "Display" },
] as const;

export const PRODUCT_STATUSES = [
  { id: "Active", name: "Active" },
  { id: "Inactive", name: "Inactive" },
  { id: "OutOfStock", name: "Out of Stock" },
] as const;
