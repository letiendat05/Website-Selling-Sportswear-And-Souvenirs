"use client"

import { useState, useMemo } from "react"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Nike Mercurial Vapor 16 Elite Vini Jr",
    price: 8500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
    category: "accessories",
  },
  {
    id: 2,
    name: "FFF Men Team 2024/25 Stadium Away",
    price: 3500000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
    category: "clothing",
  },
  {
    id: 3,
    name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
    price: 1850000,
    image:
      "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
    category: "accessories",
  },
  {
    id: 4,
    name: "Áo thể thao nam",
    price: 250000,
    image: "/placeholder.svg?height=150&width=200",
    category: "clothing",
  },
  {
    id: 5,
    name: "Móc khóa lưu niệm",
    price: 50000,
    image: "/placeholder.svg?height=150&width=200",
    category: "souvenirs",
  },
  {
    id: 6,
    name: "Bình nước thể thao",
    price: 150000,
    image: "/placeholder.svg?height=150&width=200",
    category: "accessories",
  },
]

interface ProductGridProps {
  selectedCategory: string
}

export default function ProductGrid({ selectedCategory }: ProductGridProps) {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set())
  const router = useRouter()

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory === "all") {
      filtered = products
    } else if (selectedCategory === "featured") {
      // Featured products (products with high price or specific IDs)
      filtered = products.filter((product) => product.price > 1000000 || [1, 2, 3].includes(product.id))
    } else if (selectedCategory === "new") {
      // New products (last 3 products by ID)
      filtered = products.slice(-3)
    } else if (selectedCategory === "trending") {
      // Trending products (random selection for demo)
      filtered = products.filter((product) => [1, 4, 6].includes(product.id))
    } else {
      filtered = products.filter((product) => product.category === selectedCategory)
    }

    return filtered
  }, [selectedCategory])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    setAddedItems((prev) => new Set(prev).add(product.id))

    // Remove the "added" state after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => router.push(`/product/${product.id}`)}
          className="bg-white p-4 rounded-lg shadow-md text-center hover:transform hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-200"
          />
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">{product.name}</h4>
          <p className="text-blue-600 font-bold mb-3">{product.price.toLocaleString()}₫</p>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart(product)
            }}
            className={`w-full transition-all duration-200 ${
              addedItems.has(product.id) ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {addedItems.has(product.id) ? t("products.added") : t("products.addToCart")}
          </Button>
        </div>
      ))}
    </div>
  )
}
