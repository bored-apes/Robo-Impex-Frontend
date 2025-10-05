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
    description: "Send us a detailed Enquiry",
    value: "info.roboimpex@gmail.com",
    action: "mailto:info.roboimpex@gmail.com",
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


export const LEGAL = {
  COMPANY: SITE.NAME,
  LAST_UPDATED: "October 2, 2025",
  CONTACT_EMAIL: CONTACT.SUPPORT_EMAIL || CONTACT.EMAIL,
} as const

export type LegalSection = {
  id: string
  title: string
  points: string[]
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    points: [
      "Account information: name, email, phone, and address when you create an account or place an order.",
      "Order details: products purchased, payment method, transaction status, and delivery preferences.",
      "Device and usage data: IP address, browser type, pages visited, and interactions to improve site performance.",
      "Cookies and similar technologies: used for authentication, cart persistence, analytics, and personalization.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    points: [
      "To process orders, provide invoices, and deliver products.",
      "To provide customer support, handle returns, and address inquiries.",
      "To improve products, services, UI/UX, and website performance.",
      "To send important notifications: order updates, security alerts, or policy changes.",
      "For consented marketing: newsletters, offers, and product recommendations (you can opt out anytime).",
    ],
  },
  {
    id: "sharing-disclosure",
    title: "Sharing & Disclosure",
    points: [
      "Service providers: logistics, payments, analytics, email delivery—bound by confidentiality.",
      "Legal compliance: we may share data when required by law or to protect rights and security.",
      "Business transfers: in a merger or acquisition, data may be transferred under the same protections.",
      "We do not sell your personal information.",
    ],
  },
  {
    id: "payments-security",
    title: "Payments & Security",
    points: [
      "Payments are processed via secure third-party processors; we do not store full card details.",
      "We implement technical and organizational measures to protect your data.",
      "Despite best efforts, no method of transmission or storage is 100% secure.",
    ],
  },
  {
    id: "data-retention-rights",
    title: "Data Retention & Your Rights",
    points: [
      "We retain information for as long as needed to provide services and comply with legal obligations.",
      "You can request access, correction, deletion, or portability of your data where applicable.",
      "You can object to or restrict processing in certain cases.",
      `Contact us at ${CONTACT.SUPPORT_EMAIL || CONTACT.EMAIL} to exercise your rights.`,
    ],
  },
  {
    id: "children-policy",
    title: "Children’s Privacy",
    points: [
      "Our services are not directed to children under 13 (or as defined by local law).",
      "We do not knowingly collect data from children; if you believe a child provided data, contact us for removal.",
    ],
  },
  {
    id: "changes-contact",
    title: "Changes & Contact",
    points: [
      `We may update this policy periodically. The “Last Updated” date is ${"October 2, 2025"}.`,
      `For questions, contact: ${CONTACT.SUPPORT_EMAIL || CONTACT.EMAIL}.`,
    ],
  },
]

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    points: [
      "By accessing or using the site, you agree to these Terms & Conditions.",
      "If you do not agree, please discontinue use of the site and services.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Responsibilities",
    points: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to provide accurate information and promptly update any changes.",
    ],
  },
  {
    id: "orders-payments",
    title: "Orders, Pricing & Payments",
    points: [
      "All orders are subject to acceptance and availability.",
      "Prices may change without prior notice; taxes and shipping may apply.",
      "Payments are processed securely via third-party processors.",
    ],
  },
  {
    id: "shipping-returns",
    title: "Shipping, Delivery & Returns",
    points: [
      "Estimated delivery timelines are provided at checkout.",
      "Risk of loss transfers upon delivery to the carrier as applicable.",
      "Returns are subject to our return policy and RMA approval (if applicable).",
    ],
  },
  {
    id: "warranties",
    title: "Warranties & Disclaimers",
    points: [
      "Products may include manufacturer warranties as specified by the brand.",
      "The site and services are provided on an “as is” and “as available” basis.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    points: [
      "To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages.",
      "Our total liability is limited to the amount you paid for the applicable order or service.",
    ],
  },
  {
    id: "prohibited-uses",
    title: "Prohibited Uses",
    points: [
      "You agree not to use the site for unlawful activities, security breaches, or to infringe on IP rights.",
      "Reverse engineering, scraping, or automated data extraction is prohibited where restricted by law.",
    ],
  },
  {
    id: "ip-ownership",
    title: "Intellectual Property",
    points: [
      "All site content, trademarks, and branding are owned by or licensed to us.",
      "You may not reproduce, distribute, or create derivative works without permission.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-Party Links & Services",
    points: [
      "We are not responsible for third-party content, policies, or practices.",
      "Use of third-party sites is at your own risk and subject to their terms.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    points: [
      "Your use of the site is also governed by our Privacy Policy.",
      "Please review the Privacy Policy to understand how we process your data.",
    ],
  },
  {
    id: "termination",
    title: "Suspension & Termination",
    points: [
      "We may suspend or terminate access for violations of these Terms or for security reasons.",
      "Upon termination, certain provisions will continue to apply as required by law.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    points: [
      "These Terms are governed by applicable laws of the jurisdiction where we operate.",
      "Disputes will be resolved in courts of competent jurisdiction as allowed by law.",
    ],
  },
  {
    id: "changes-contact",
    title: "Changes & Contact",
    points: [
      "We may update these Terms from time to time. Continued use constitutes acceptance of changes.",
      `For questions, contact: ${CONTACT.SUPPORT_EMAIL || CONTACT.EMAIL}.`,
    ],
  },
]

export const values = [
    {
      icon: "mdi:shield-check",
      title: "Quality Assurance",
      description:
        "Every device undergoes rigorous quality checks and supplier verification.",
    },
    {
      icon: "mdi:handshake",
      title: "Trust & Reliability",
      description:
        "Building long-term partnerships with suppliers and customers worldwide.",
    },
    {
      icon: "mdi:rocket-launch",
      title: "Innovation",
      description:
        "Continuously improving our platform with cutting-edge technology.",
    },
    {
      icon: "mdi:earth",
      title: "Global Connectivity",
      description:
        "Connecting businesses across continents with seamless solutions.",
    },
  ] as const;

export const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=200&width=200",
      description: "20+ years experience in industrial and B2B marketplaces.",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Technology leader with expertise in scalable platform development.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/placeholder.svg?height=200&width=200",
      description: "Supply chain expert ensuring smooth global operations.",
    },
    {
      name: "Emily Davis",
      role: "Head of Quality",
      image: "/placeholder.svg?height=200&width=200",
      description:
        "Quality assurance specialist with manufacturing background.",
    },
  ] as const;
export const getProductTypeTheme = (type: string) => {
    const themes = {
      IC: {
        bg: "bg-blue-500/10 dark:bg-blue-500/20",
        border: "border-blue-500/30 dark:border-blue-500/50",
        text: "text-blue-600 dark:text-blue-400",
        hover: "hover:bg-blue-500/20 dark:hover:bg-blue-500/30",
      },
      Microcontroller: {
        bg: "bg-purple-500/10 dark:bg-purple-500/20",
        border: "border-purple-500/30 dark:border-purple-500/50",
        text: "text-purple-600 dark:text-purple-400",
        hover: "hover:bg-purple-500/20 dark:hover:bg-purple-500/30",
      },
      Sensor: {
        bg: "bg-green-500/10 dark:bg-green-500/20",
        border: "border-green-500/30 dark:border-green-500/50",
        text: "text-green-600 dark:text-green-400",
        hover: "hover:bg-green-500/20 dark:hover:bg-green-500/30",
      },
      Module: {
        bg: "bg-orange-500/10 dark:bg-orange-500/20",
        border: "border-orange-500/30 dark:border-orange-500/50",
        text: "text-orange-600 dark:text-orange-400",
        hover: "hover:bg-orange-500/20 dark:hover:bg-orange-500/30",
      },
      DevBoard: {
        bg: "bg-red-500/10 dark:bg-red-500/20",
        border: "border-red-500/30 dark:border-red-500/50",
        text: "text-red-600 dark:text-red-400",
        hover: "hover:bg-red-500/20 dark:hover:bg-red-500/30",
      },
      PCB: {
        bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
        border: "border-indigo-500/30 dark:border-indigo-500/50",
        text: "text-indigo-600 dark:text-indigo-400",
        hover: "hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30",
      },
      Connector: {
        bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
        border: "border-yellow-500/30 dark:border-yellow-500/50",
        text: "text-yellow-600 dark:text-yellow-400",
        hover: "hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30",
      },
      PowerSupply: {
        bg: "bg-pink-500/10 dark:bg-pink-500/20",
        border: "border-pink-500/30 dark:border-pink-500/50",
        text: "text-pink-600 dark:text-pink-400",
        hover: "hover:bg-pink-500/20 dark:hover:bg-pink-500/30",
      },
      Display: {
        bg: "bg-teal-500/10 dark:bg-teal-500/20",
        border: "border-teal-500/30 dark:border-teal-500/50",
        text: "text-teal-600 dark:text-teal-400",
        hover: "hover:bg-teal-500/20 dark:hover:bg-teal-500/30",
      },
    };
    return themes[type as keyof typeof themes] || themes.IC;
  };

  
