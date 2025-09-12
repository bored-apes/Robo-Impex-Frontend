
export const SITE = {
    NAME: "Robo Impax",
    URL: process.env.NEXT_PUBLIC_SITE_URL || "https://industrialhub.com",
    DESCRIPTION: "Leading B2B marketplace for industrial machinery, equipment, and manufacturing solutions",
    KEYWORDS: ["industrial machinery", "B2B marketplace", "manufacturing equipment", "suppliers"],
}

export const CONTACT = {
    ADDRESS: "123 Industrial District, Manufacturing City, MC 12345",
    PHONE: "+1 (555) 123-4567",
    EMAIL: "info@industrialhub.com",
    SUPPORT_EMAIL: "support@industrialhub.com",
    SALES_EMAIL: "sales@industrialhub.com",
}

export const SOCIAL = {
    FACEBOOK: "https://facebook.com/industrialhub",
    TWITTER: "https://twitter.com/industrialhub",
    LINKEDIN: "https://linkedin.com/company/industrialhub",
    YOUTUBE: "https://youtube.com/industrialhub",
}

export const FEATURES = {
    ENABLE_WISHLIST: true,
    ENABLE_CART: true,
    ENABLE_REVIEWS: true,
    ENABLE_COMPARISON: true,
    ENABLE_NEWSLETTER: true,
}

export const CURRENCY = {
    CODE: "USD",
    SYMBOL: "$",
    LOCALE: "en-US",
}

export const PAGINATION = {
    PRODUCTS_PER_PAGE: 12,
    REVIEWS_PER_PAGE: 5,
    ORDERS_PER_PAGE: 10,
}

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
]
