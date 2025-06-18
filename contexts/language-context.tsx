"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  vi: {
    // Header
    "header.home": "Trang chủ",
    "header.products": "Sản phẩm",
    "header.cart": "Giỏ hàng",
    "header.login": "Đăng nhập",
    "header.register": "Đăng ký",
    "header.profile": "Thông tin cá nhân",
    "header.orders": "Đơn hàng của tôi",
    "header.settings": "Cài đặt",
    "header.logout": "Đăng xuất",
    "header.admin": "Quản trị hệ thống",

    // Categories
    "categories.title": "Danh mục sản phẩm",
    "categories.subtitle": "Khám phá các sản phẩm thể thao chất lượng cao",
    "categories.all": "Tất cả sản phẩm",
    "categories.featured": "⭐ Nổi bật",
    "categories.new": "🆕 Mới nhất",
    "categories.trending": "🔥 Xu hướng",
    "categories.clothing": "👕 Áo thể thao",
    "categories.accessories": "🏆 Phụ kiện",
    "categories.souvenirs": "🎁 Quà lưu niệm",

    // Products
    "products.featured": "Sản phẩm nổi bật",
    "products.featured.subtitle":
      "Khám phá những sản phẩm thể thao chất lượng cao được yêu thích nhất tại cửa hàng của chúng tôi",
    "products.addToCart": "Thêm vào giỏ",
    "products.added": "Đã thêm!",
    "products.viewAll": "Xem tất cả sản phẩm",
    "products.view": "Xem",
    "products.new": "Mới",
    "products.bestseller": "Bán chạy",

    // Auth
    "auth.login": "Đăng nhập",
    "auth.register": "Đăng ký",
    "auth.email": "Email",
    "auth.password": "Mật khẩu",
    "auth.name": "Họ và tên",
    "auth.phone": "Số điện thoại",
    "auth.backToHome": "Về trang chủ",

    // Common
    "common.loading": "Đang tải...",
    "common.save": "Lưu",
    "common.cancel": "Hủy",
    "common.delete": "Xóa",
    "common.edit": "Chỉnh sửa",
    "common.search": "Tìm kiếm",

    // Product Detail
    "product.backToProducts": "Quay lại sản phẩm",
    "product.brand": "Thương hiệu",
    "product.reviews": "đánh giá",
    "product.inStock": "Còn hàng",
    "product.outOfStock": "Hết hàng",
    "product.quantity": "Số lượng",
    "product.maxQuantity": "Tối đa",
    "product.size": "Kích thước",
    "product.addToCart": "Thêm vào giỏ hàng",
    "product.added": "Đã thêm vào giỏ!",
    "product.description": "Mô tả sản phẩm",
    "product.features": "Tính năng nổi bật",
    "product.specifications": "Thông số kỹ thuật",
    "product.relatedProducts": "Sản phẩm liên quan",
    "product.viewDetails": "Xem chi tiết",
    "product.freeShipping": "Miễn phí vận chuyển",
    "product.warranty": "Bảo hành chính hãng",
    "product.returnPolicy": "Đổi trả dễ dàng",
    "product.save": "Tiết kiệm",
  },
  en: {
    // Header
    "header.home": "Home",
    "header.products": "Products",
    "header.cart": "Cart",
    "header.login": "Login",
    "header.register": "Register",
    "header.profile": "Profile",
    "header.orders": "My Orders",
    "header.settings": "Settings",
    "header.logout": "Logout",
    "header.admin": "Admin Panel",

    // Categories
    "categories.title": "Product Categories",
    "categories.subtitle": "Explore high-quality sports products",
    "categories.all": "All Products",
    "categories.featured": "⭐ Featured",
    "categories.new": "🆕 New",
    "categories.trending": "🔥 Trending",
    "categories.clothing": "👕 Sports Wear",
    "categories.accessories": "🏆 Accessories",
    "categories.souvenirs": "🎁 Souvenirs",

    // Products
    "products.featured": "Featured Products",
    "products.featured.subtitle": "Discover the most popular high-quality sports products in our store",
    "products.addToCart": "Add to Cart",
    "products.added": "Added!",
    "products.viewAll": "View All Products",
    "products.view": "View",
    "products.new": "New",
    "products.bestseller": "Best Seller",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    "auth.backToHome": "Back to Home",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.search": "Search",

    // Product Detail
    "product.backToProducts": "Back to Products",
    "product.brand": "Brand",
    "product.reviews": "reviews",
    "product.inStock": "In Stock",
    "product.outOfStock": "Out of Stock",
    "product.quantity": "Quantity",
    "product.maxQuantity": "Maximum",
    "product.size": "Size",
    "product.addToCart": "Add to Cart",
    "product.added": "Added to Cart!",
    "product.description": "Product Description",
    "product.features": "Key Features",
    "product.specifications": "Specifications",
    "product.relatedProducts": "Related Products",
    "product.viewDetails": "View Details",
    "product.freeShipping": "Free Shipping",
    "product.warranty": "Official Warranty",
    "product.returnPolicy": "Easy Returns",
    "product.save": "Save",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
