"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Shirt, Trophy, Gift, Zap, Star, TrendingUp } from "lucide-react"

export default function TopCategories() {
  const { t } = useLanguage()

  const categories = [
    {
      id: "featured",
      name: t("categories.featured"),
      icon: Star,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      description: "Sản phẩm được yêu thích nhất",
    },
    {
      id: "new",
      name: t("categories.new"),
      icon: Zap,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      description: "Sản phẩm mới ra mắt",
    },
    {
      id: "trending",
      name: t("categories.trending"),
      icon: TrendingUp,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      description: "Đang được quan tâm",
    },
    {
      id: "clothing",
      name: t("categories.clothing"),
      icon: Shirt,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      description: "Áo đấu, áo tập các loại",
    },
    {
      id: "accessories",
      name: t("categories.accessories"),
      icon: Trophy,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      description: "Giày, găng tay, bóng đá",
    },
    {
      id: "souvenirs",
      name: t("categories.souvenirs"),
      icon: Gift,
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      description: "Móc khóa, cốc, sticker",
    },
  ]

  return (
    <div className="bg-white py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("categories.title")}</h2>
          <p className="text-gray-600">{t("categories.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} ${category.hoverColor} text-white mb-4 transition-colors duration-300`}
              >
                <category.icon size={28} />
              </div>

              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                {category.name}
              </h3>

              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                {category.description}
              </p>

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
            <div className="text-sm text-gray-600">Sản phẩm</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">1000+</div>
            <div className="text-sm text-gray-600">Khách hàng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Thương hiệu</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Hỗ trợ</div>
          </div>
        </div>
      </div>
    </div>
  )
}
