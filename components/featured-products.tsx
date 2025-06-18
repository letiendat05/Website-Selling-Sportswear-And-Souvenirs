"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Nike Mercurial Vapor 16 Elite Vini Jr",
    price: 7650000,
    originalPrice: 8500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
    category: "accessories",
    rating: 4.8,
    reviews: 124,
    isBestSeller: true,
    discount: 10,
  },
  {
    id: 2,
    name: "FFF Men Team 2024/25 Stadium Away",
    price: 3500000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
    category: "clothing",
    rating: 4.6,
    reviews: 89,
    isNew: true,
  },
  {
    id: 3,
    name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
    price: 1665000,
    originalPrice: 1850000,
    image:
      "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
    category: "accessories",
    rating: 4.7,
    reviews: 67,
    discount: 10,
  },
  {
    id: 7,
    name: "Adidas Predator Elite FG",
    price: 7200000,
    image: "/placeholder.svg?height=200&width=200",
    category: "accessories",
    rating: 4.9,
    reviews: 156,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Barcelona Home Jersey 2024/25",
    price: 2800000,
    image: "/placeholder.svg?height=200&width=200",
    category: "clothing",
    rating: 4.5,
    reviews: 203,
    isNew: true,
  },
  {
    id: 9,
    name: "Nike Academy Pro Ball",
    price: 890000,
    originalPrice: 990000,
    image: "/placeholder.svg?height=200&width=200",
    category: "accessories",
    rating: 4.4,
    reviews: 78,
    discount: 10,
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const router = useRouter()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedItems((prev) => new Set(prev).add(product.id))

    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("products.featured")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("products.featured.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">{t("products.new")}</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">{t("products.bestseller")}</Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white">-{product.discount}%</Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Heart
                    size={16}
                    className={`${
                      favorites.has(product.id) ? "text-red-500 fill-current" : "text-gray-400"
                    } transition-colors`}
                  />
                </button>

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/product/${product.id}`)
                    }}
                  >
                    <Eye size={16} className="mr-1" />
                    {t("products.view")}
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2 h-10">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-sm line-through">
                        {product.originalPrice.toLocaleString()}₫
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                  className={`w-full transition-all duration-200 ${
                    addedItems.has(product.id) ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  size="sm"
                >
                  {addedItems.has(product.id) ? (
                    t("products.added")
                  ) : (
                    <>
                      <ShoppingCart size={14} className="mr-1" />
                      {t("products.addToCart")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="px-8">
            {t("products.viewAll")}
          </Button>
        </div>
      </div>
    </div>
  )
}
