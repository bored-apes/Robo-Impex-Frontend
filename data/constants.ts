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
  ADDRESS:
    "35, khodiyar krupa soc., shyamdham mandir, sarthana jakatnaka, surat - 395006",
  PHONE: "+91 72028 73950",
  EMAIL: "info@roboimpex.com",
  SUPPORT_EMAIL: "support.roboimpex@gmail.com",
  SALES_EMAIL: "sales.roboimpex@gmail.com",
  BUSINESS_HOURS: "Mon-Sat: 9AM-6PM IST",
  CITY: "Surat Office",
  HOURS: "Mon-Sat: 9AM-6PM IST",
};

export const SOCIAL = {
  TWITTER: "https://x.com/roboimpex",
  INSTAGRAM: "https://www.instagram.com/roboimpex/",
  WHATSAPP: "https://wa.me/7202873950",
  YOUTUBE: "https://www.youtube.com/channel/UC4-BWaS5NxoUzGUiHoiOVtA",
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
];

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
    value: "+91 7202873950",
    action: "tel:+917202873950",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a detailed Enquiry",
    value: "info@roboimpex.com",
    action: "mailto:info@roboimpex.com",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
] as const;

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

// /data/constants.ts

export const LEGAL = {
  CONTACT_EMAIL: "support@yourstore.com",
  COMPANY_NAME: "YourStore Technologies Pvt. Ltd.",
  WEBSITE_NAME: "YourStore",
};

export const PRIVACY_SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    points: [
      "Personal details such as name, email, phone number, and billing/shipping addresses provided during account creation or checkout.",
      "Payment and transaction details processed securely via trusted third-party payment gateways (we do not store full card information).",
      "Device, browser, and analytics data collected automatically to improve site performance and security.",
      "Cookies and similar technologies used for login sessions, shopping cart functionality, and analytics.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    points: [
      "To process orders, deliver products, and provide after-sales support.",
      "To improve website performance, usability, and customer experience.",
      "To communicate order status updates, promotions, or product recommendations (if you have opted in).",
      "To comply with legal obligations and prevent fraudulent or unauthorized activity.",
    ],
  },
  {
    id: "data-protection",
    title: "Data Security & Retention",
    points: [
      "All personal data is encrypted in transit using SSL/TLS protocols.",
      "We use industry-standard practices to secure our servers and databases.",
      "User data is retained only as long as necessary for order fulfillment, accounting, or legal compliance.",
      "You can request data deletion or correction anytime by contacting us at support@yourstore.com.",
    ],
  },
  {
    id: "sharing-of-information",
    title: "Sharing of Information",
    points: [
      "We never sell or rent your personal data.",
      "We may share limited information with logistics, payment, or analytics partners strictly to fulfill our services.",
      "All third-party partners are required to comply with applicable data protection laws.",
    ],
  },
  {
    id: "user-rights",
    title: "Your Rights",
    points: [
      "Access, correct, or delete your personal information upon request.",
      "Opt out of marketing communications at any time via email or account settings.",
      "Withdraw consent for data processing where applicable.",
    ],
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    points: [
      "This Privacy Policy may be updated periodically to reflect operational, legal, or regulatory changes.",
      "Continued use of our site after such updates implies acceptance of the revised policy.",
    ],
  },
];

export const TERMS_SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    points: [
      "These Terms & Conditions govern your use of our e-commerce platform and the purchase of IoT, robotics, and electronic components from YourStore Technologies Pvt. Ltd.",
      "By accessing or purchasing from our website, you agree to these terms in full.",
    ],
  },
  {
    id: "account",
    title: "User Accounts & Responsibilities",
    points: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You must be at least 18 years old or have parental consent to create an account.",
      "You agree to provide accurate and up-to-date information for all transactions.",
    ],
  },
  {
    id: "orders",
    title: "Orders, Pricing & Availability",
    points: [
      "All products are subject to availability. We reserve the right to cancel or limit orders based on stock or suspected misuse.",
      "Prices may change without prior notice due to component market fluctuations.",
      "In case of pricing errors, we reserve the right to correct or cancel affected orders.",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    points: [
      "Payments are processed securely through third-party payment gateways.",
      "We do not store sensitive payment information such as full credit/debit card numbers.",
      "Orders are processed only after successful payment confirmation.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    points: [
      "Shipping times depend on product availability and destination.",
      "We are not responsible for delays caused by courier partners or customs.",
      "Tracking details will be shared once your order has been dispatched.",
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    points: [
      "Only unused and undamaged products are eligible for return within 7 days of delivery.",
      "Electronic components once soldered or damaged due to mishandling are not eligible for return.",
      "Refunds are processed within 7–10 business days after inspection and approval.",
    ],
  },
  {
    id: "warranty",
    title: "Product Warranty",
    points: [
      "Some products may carry a manufacturer’s warranty, details of which will be mentioned on the product page.",
      "Warranty claims are handled according to manufacturer policies and may require original purchase proof.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    points: [
      "We are not liable for indirect, incidental, or consequential damages arising from the use or misuse of products purchased from our store.",
      "IoT and robotics components are intended for technical and educational purposes. Proper handling and safety precautions are the user’s responsibility.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    points: [
      "These terms are governed by the laws of India.",
      "Any disputes will be subject to the jurisdiction of courts in Gujarat, India.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    points: [
      "For any queries regarding these Terms or our policies, contact us at support@yourstore.com.",
    ],
  },
];

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


export const getProductTypeTheme = (type: string) => {
  const themes = {
    IC: {
      bg: "bg-blue-500/20 dark:bg-blue-500/50",
      border: "border-blue-500/30 dark:border-blue-500/50",
      text: "text-blue-600 dark:text-blue-400",
      hover: "hover:bg-blue-500/20 dark:hover:bg-blue-500/30",
    },
    Microcontroller: {
      bg: "bg-purple-500/20 dark:bg-purple-500/50",
      border: "border-purple-500/30 dark:border-purple-500/50",
      text: "text-purple-600 dark:text-purple-400",
      hover: "hover:bg-purple-500/20 dark:hover:bg-purple-500/30",
    },
    Sensor: {
      bg: "bg-green-500/20 dark:bg-green-500/50",
      border: "border-green-500/30 dark:border-green-500/50",
      text: "text-green-600 dark:text-green-400",
      hover: "hover:bg-green-500/20 dark:hover:bg-green-500/30",
    },
    Module: {
      bg: "bg-orange-500/20 dark:bg-orange-500/50",
      border: "border-orange-500/30 dark:border-orange-500/50",
      text: "text-orange-600 dark:text-orange-400",
      hover: "hover:bg-orange-500/20 dark:hover:bg-orange-500/30",
    },
    DevBoard: {
      bg: "bg-red-500/20 dark:bg-red-500/50",
      border: "border-red-500/30 dark:border-red-500/50",
      text: "text-red-600 dark:text-red-400",
      hover: "hover:bg-red-500/20 dark:hover:bg-red-500/30",
    },
    PCB: {
      bg: "bg-indigo-500/20 dark:bg-indigo-500/50",
      border: "border-indigo-500/30 dark:border-indigo-500/50",
      text: "text-indigo-600 dark:text-indigo-400",
      hover: "hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30",
    },
    Connector: {
      bg: "bg-yellow-500/20 dark:bg-yellow-500/50",
      border: "border-yellow-500/30 dark:border-yellow-500/50",
      text: "text-yellow-600 dark:text-yellow-400",
      hover: "hover:bg-yellow-500/20 dark:hover:bg-yellow-500/30",
    },
    PowerSupply: {
      bg: "bg-pink-500/20 dark:bg-pink-500/50",
      border: "border-pink-500/30 dark:border-pink-500/50",
      text: "text-pink-600 dark:text-pink-400",
      hover: "hover:bg-pink-500/20 dark:hover:bg-pink-500/30",
    },
    Display: {
      bg: "bg-teal-500/20 dark:bg-teal-500/50",
      border: "border-teal-500/30 dark:border-teal-500/50",
      text: "text-teal-600 dark:text-teal-400",
      hover: "hover:bg-teal-500/20 dark:hover:bg-teal-500/30",
    },
  };
  return themes[type as keyof typeof themes] || themes.IC;
};
