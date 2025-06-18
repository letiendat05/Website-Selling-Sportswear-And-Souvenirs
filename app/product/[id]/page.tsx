"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus,
  Check,
} from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  description: string
  features: string[]
  specifications: { [key: string]: string }
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
  inStock: number
  brand: string
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Nike Mercurial Vapor 16 Elite Vini Jr",
    price: 7650000,
    originalPrice: 8500000,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "accessories",
    rating: 4.8,
    reviews: 124,
    description:
      "Giày đá bóng Nike Mercurial Vapor 16 Elite được thiết kế đặc biệt cho Vinicius Jr. với công nghệ tiên tiến nhất từ Nike. Giày có thiết kế nhẹ, ôm chân và cung cấp độ bám tuyệt vời trên sân cỏ.",
    features: [
      "Công nghệ Nike Gripknit cho độ bám tối ưu",
      "Đế ngoài Tri-Star cho tốc độ và sự linh hoạt",
      "Upper Flyknit siêu nhẹ và thoáng khí",
      "Thiết kế đặc biệt cho Vinicius Jr.",
      "Phù hợp cho sân cỏ tự nhiên",
    ],
    specifications: {
      "Thương hiệu": "Nike",
      "Dòng sản phẩm": "Mercurial Vapor 16 Elite",
      "Loại sân": "Firm Ground (FG)",
      "Chất liệu upper": "Flyknit",
      "Chất liệu đế": "TPU",
      "Trọng lượng": "196g",
      "Màu sắc": "Xanh dương/Vàng",
    },
    isBestSeller: true,
    discount: 10,
    inStock: 15,
    brand: "Nike",
  },
  {
    id: 2,
    name: "FFF Men Team 2024/25 Stadium Away",
    price: 3500000,
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
    images: [
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "clothing",
    rating: 4.6,
    reviews: 89,
    description:
      "Áo đấu chính thức của Đội tuyển Pháp mùa giải 2024/25. Được làm từ chất liệu Dri-FIT cao cấp, giúp thấm hút mồ hôi và giữ cơ thể khô ráo trong suốt trận đấu.",
    features: [
      "Công nghệ Nike Dri-FIT thấm hút mồ hôi",
      "Thiết kế chính thức của Đội tuyển Pháp",
      "Chất liệu polyester tái chế",
      "Form áo Stadium fit thoải mái",
      "Logo FFF thêu cao cấp",
    ],
    specifications: {
      "Thương hiệu": "Nike",
      "Đội bóng": "Đội tuyển Pháp",
      "Mùa giải": "2024/25",
      "Loại áo": "Stadium Away",
      "Chất liệu": "100% Polyester",
      "Công nghệ": "Dri-FIT",
      "Xuất xứ": "Thái Lan",
    },
    isNew: true,
    inStock: 25,
    brand: "Nike",
  },
  {
    id: 3,
    name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
    price: 1665000,
    originalPrice: 1850000,
    image:
      "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
    images: [
      "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "accessories",
    rating: 4.7,
    reviews: 67,
    description:
      "Găng tay thủ môn Nike Vapor Grip 3 với công nghệ bám bóng tiên tiến, giúp thủ môn có độ bám tối ưu trong mọi điều kiện thời tiết. Thiết kế ergonomic ôm sát bàn tay.",
    features: [
      "Công nghệ Grip3 cho độ bám vượt trội",
      "Lớp đệm ACC (All Conditions Control)",
      "Thiết kế Cut 4 cho sự linh hoạt",
      "Dây đeo có thể điều chỉnh",
      "Chất liệu latex cao cấp",
    ],
    specifications: {
      "Thương hiệu": "Nike",
      "Dòng sản phẩm": "Vapor Grip 3",
      "Loại cut": "Negative Cut",
      "Chất liệu lòng bàn": "Latex",
      "Công nghệ": "Grip3 + ACC",
      "Màu sắc": "Xanh lá/Đen",
      "Kích thước": "7, 8, 9, 10, 11",
    },
    discount: 10,
    inStock: 8,
    brand: "Nike",
  },
  {
    id: 4,
    name: "Áo thể thao nam",
    price: 250000,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "clothing",
    rating: 4.2,
    reviews: 45,
    description:
      "Áo thể thao nam basic với chất liệu cotton thoáng mát, phù hợp cho tập luyện hàng ngày và các hoạt động thể thao.",
    features: [
      "Chất liệu cotton 100%",
      "Thiết kế basic dễ phối đồ",
      "Thoáng mát và thấm hút mồ hôi",
      "Form áo regular fit",
      "Nhiều màu sắc lựa chọn",
    ],
    specifications: {
      "Chất liệu": "100% Cotton",
      "Form áo": "Regular Fit",
      "Màu sắc": "Đen, Trắng, Xám",
      Size: "S, M, L, XL, XXL",
      "Xuất xứ": "Việt Nam",
    },
    inStock: 50,
    brand: "Local Brand",
  },
  {
    id: 5,
    name: "Móc khóa lưu niệm",
    price: 50000,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400"],
    category: "souvenirs",
    rating: 4.0,
    reviews: 23,
    description: "Móc khóa lưu niệm với thiết kế độc đáo, phù hợp làm quà tặng hoặc sưu tập.",
    features: [
      "Thiết kế độc đáo",
      "Chất liệu kim loại bền bỉ",
      "Kích thước nhỏ gọn",
      "Phù hợp làm quà tặng",
      "Nhiều mẫu mã khác nhau",
    ],
    specifications: {
      "Chất liệu": "Kim loại",
      "Kích thước": "5cm x 3cm",
      "Trọng lượng": "15g",
      "Màu sắc": "Đa màu",
    },
    inStock: 100,
    brand: "Souvenir Co",
  },
  {
    id: 6,
    name: "Bình nước thể thao",
    price: 150000,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    category: "accessories",
    rating: 4.3,
    reviews: 78,
    description: "Bình nước thể thao với dung tích 750ml, thiết kế tiện lợi cho các hoạt động thể thao và tập luyện.",
    features: [
      "Dung tích 750ml",
      "Chất liệu nhựa an toàn",
      "Nắp đậy chống rò rỉ",
      "Thiết kế ergonomic",
      "Dễ dàng vệ sinh",
    ],
    specifications: {
      "Dung tích": "750ml",
      "Chất liệu": "Nhựa PP",
      "Kích thước": "25cm x 7cm",
      "Trọng lượng": "120g",
      "Màu sắc": "Xanh, Đỏ, Đen",
    },
    inStock: 30,
    brand: "Sport Bottle",
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")

  useEffect(() => {
    const productId = Number.parseInt(params.id as string)
    const foundProduct = allProducts.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      router.push("/")
    }
  }, [params.id, router])

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.inStock || 1)) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Đang tải...</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-blue-600">
            <ArrowLeft size={16} />
            Quay lại
          </button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">Mới</Badge>}
                {product.isBestSeller && <Badge className="bg-red-500 hover:bg-red-600 text-white">Bán chạy</Badge>}
                {product.discount && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white">-{product.discount}%</Badge>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Heart
                  size={20}
                  className={`${isFavorite ? "text-red-500 fill-current" : "text-gray-400"} transition-colors`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews} đánh giá)
                  </span>
                </div>
                <span className="text-sm text-gray-500">Thương hiệu: {product.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()}₫</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString()}₫</span>
              )}
              {product.discount && (
                <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
                  Tiết kiệm {((product.originalPrice! - product.price) / 1000).toFixed(0)}K
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.inStock > 0 ? `Còn ${product.inStock} sản phẩm` : "Hết hàng"}
              </span>
            </div>

            {/* Size Selection (for clothing/shoes) */}
            {(product.category === "clothing" || product.category === "accessories") && product.specifications.Size && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Kích thước:</h3>
                <div className="flex gap-2">
                  {product.specifications.Size.split(", ").map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Số lượng:</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.inStock}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Tối đa {product.inStock} sản phẩm</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inStock === 0 || isAdded}
                  className={`flex-1 py-3 text-lg font-medium transition-all duration-200 ${
                    isAdded ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Đã thêm vào giỏ!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Thêm vào giỏ hàng
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Miễn phí vận chuyển</p>
                      <p className="text-sm text-gray-500">Đơn hàng từ 500K</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">Bảo hành chính hãng</p>
                      <p className="text-sm text-gray-500">12 tháng</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="font-medium">Đổi trả dễ dàng</p>
                      <p className="text-sm text-gray-500">Trong 7 ngày</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tính năng nổi bật:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span className="text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      {relatedProduct.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          -{relatedProduct.discount}%
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-blue-600">{relatedProduct.price.toLocaleString()}₫</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {relatedProduct.originalPrice.toLocaleString()}₫
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => router.push(`/product/${relatedProduct.id}`)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
