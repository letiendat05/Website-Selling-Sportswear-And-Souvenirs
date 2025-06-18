"use client"

import { useLanguage } from "@/contexts/language-context"

interface SidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const { t } = useLanguage()

  const categories = [
    { id: "all", name: t("categories.all") },
    { id: "featured", name: t("categories.featured") },
    { id: "new", name: t("categories.new") },
    { id: "trending", name: t("categories.trending") },
    { id: "clothing", name: t("categories.clothing") },
    { id: "accessories", name: t("categories.accessories") },
    { id: "souvenirs", name: t("categories.souvenirs") },
  ]

  return (
    <aside className="w-56 bg-white p-6 rounded-lg shadow-md h-fit">
      <h3 className="text-lg font-semibold text-blue-600 mb-4 uppercase">Danh mục</h3>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left font-medium transition-colors ${
                selectedCategory === category.id ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
