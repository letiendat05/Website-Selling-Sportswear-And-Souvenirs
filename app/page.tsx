"use client"

import { useState } from "react"
import Header from "@/components/header"
import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import TopCategories from "@/components/top-categories"
import FeaturedProducts from "@/components/featured-products"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />
      <Banner />
      <TopCategories />
      <FeaturedProducts />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <Sidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
