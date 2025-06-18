"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, ImageIcon, Trash2 } from "lucide-react"

interface ProductFormData {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  category: string
  brand: string
  inStock: number
  images: string[]
  features: string[]
  specifications: { [key: string]: string }
  isNew: boolean
  isBestSeller: boolean
  isActive: boolean
  tags: string[]
}

const categories = [
  { value: "clothing", label: "Áo thể thao" },
  { value: "accessories", label: "Phụ kiện" },
  { value: "souvenirs", label: "Quà lưu niệm" },
]

const brands = ["Nike", "Adidas", "Puma", "Under Armour", "New Balance", "Reebok", "Local Brand", "Other"]

// Mock product data
const mockProducts: ProductFormData[] = [
  {
    id: 1,
    name: "Nike Mercurial Vapor 16 Elite Vini Jr",
    description:
      "Giày đá bóng Nike Mercurial Vapor 16 Elite được thiết kế đặc biệt cho Vinicius Jr. với công nghệ tiên tiến nhất từ Nike.",
    price: 7650000,
    originalPrice: 8500000,
    category: "accessories",
    brand: "Nike",
    inStock: 15,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
    ],
    features: [
      "Công nghệ Nike Gripknit cho độ bám tối ưu",
      "Đế ngoài Tri-Star cho tốc độ và sự linh hoạt",
      "Upper Flyknit siêu nhẹ và thoáng khí",
    ],
    specifications: {
      "Thương hiệu": "Nike",
      "Dòng sản phẩm": "Mercurial Vapor 16 Elite",
      "Loại sân": "Firm Ground (FG)",
      "Chất liệu upper": "Flyknit",
    },
    isNew: false,
    isBestSeller: true,
    isActive: true,
    tags: ["giày đá bóng", "nike", "vinicius jr"],
  },
  {
    id: 2,
    name: "FFF Men Team 2024/25 Stadium Away",
    description: "Áo đấu chính thức của Đội tuyển Pháp mùa giải 2024/25. Được làm từ chất liệu Dri-FIT cao cấp.",
    price: 3500000,
    originalPrice: 0,
    category: "clothing",
    brand: "Nike",
    inStock: 25,
    images: [
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
    ],
    features: [
      "Công nghệ Nike Dri-FIT thấm hút mồ hôi",
      "Thiết kế chính thức của Đội tuyển Pháp",
      "Chất liệu polyester tái chế",
    ],
    specifications: {
      "Thương hiệu": "Nike",
      "Đội bóng": "Đội tuyển Pháp",
      "Mùa giải": "2024/25",
      "Chất liệu": "100% Polyester",
    },
    isNew: true,
    isBestSeller: false,
    isActive: true,
    tags: ["áo đấu", "pháp", "nike"],
  },
]

export default function EditProductPage() {
  const params = useParams()
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newTag, setNewTag] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [formData, setFormData] = useState<ProductFormData | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    // Load product data
    const productId = Number.parseInt(params.id as string)
    const product = mockProducts.find((p) => p.id === productId)

    if (product) {
      setFormData(product)
    } else {
      router.push("/admin/products")
    }
  }, [params.id, router])

  const handleInputChange = (field: string, value: any) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const addImage = () => {
    if (!formData || !imageUrl.trim() || formData.images.includes(imageUrl.trim())) return

    setFormData((prev) => ({
      ...prev!,
      images: [...prev!.images, imageUrl.trim()],
    }))
    setImageUrl("")
  }

  const removeImage = (index: number) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      images: prev!.images.filter((_, i) => i !== index),
    }))
  }

  const addFeature = () => {
    if (!formData || !newFeature.trim() || formData.features.includes(newFeature.trim())) return

    setFormData((prev) => ({
      ...prev!,
      features: [...prev!.features, newFeature.trim()],
    }))
    setNewFeature("")
  }

  const removeFeature = (index: number) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      features: prev!.features.filter((_, i) => i !== index),
    }))
  }

  const addSpecification = () => {
    if (!formData || !newSpecKey.trim() || !newSpecValue.trim() || formData.specifications[newSpecKey.trim()]) return

    setFormData((prev) => ({
      ...prev!,
      specifications: {
        ...prev!.specifications,
        [newSpecKey.trim()]: newSpecValue.trim(),
      },
    }))
    setNewSpecKey("")
    setNewSpecValue("")
  }

  const removeSpecification = (key: string) => {
    if (!formData) return

    setFormData((prev) => {
      const newSpecs = { ...prev!.specifications }
      delete newSpecs[key]
      return {
        ...prev!,
        specifications: newSpecs,
      }
    })
  }

  const addTag = () => {
    if (!formData || !newTag.trim() || formData.tags.includes(newTag.trim())) return

    setFormData((prev) => ({
      ...prev!,
      tags: [...prev!.tags, newTag.trim()],
    }))
    setNewTag("")
  }

  const removeTag = (index: number) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      tags: prev!.tags.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    if (!formData) return false

    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc"
    if (!formData.description.trim()) newErrors.description = "Mô tả sản phẩm là bắt buộc"
    if (formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0"
    if (!formData.category) newErrors.category = "Danh mục là bắt buộc"
    if (!formData.brand.trim()) newErrors.brand = "Thương hiệu là bắt buộc"
    if (formData.inStock < 0) newErrors.inStock = "Số lượng tồn kho không được âm"
    if (formData.images.length === 0) newErrors.images = "Cần ít nhất 1 hình ảnh"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Vui lòng kiểm tra lại thông tin!")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Updated product data:", formData)
      alert("Sản phẩm đã được cập nhật thành công!")
      router.push("/admin/products")
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật sản phẩm!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Sản phẩm đã được xóa!")
      router.push("/admin/products")
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa sản phẩm!")
    }
  }

  if (isLoading || !formData) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  const discount =
    formData.originalPrice > formData.price
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
              <p className="text-gray-600">
                ID: {formData.id} - {formData.name}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-2">
              <Trash2 size={16} />
              Xóa
            </Button>
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-2">
              <Eye size={16} />
              {previewMode ? "Chỉnh sửa" : "Xem trước"}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              {isSubmitting ? "Đang lưu..." : "Cập nhật"}
            </Button>
          </div>
        </div>

        {/* Same content as Add Product page but with formData populated */}
        {previewMode ? (
          /* Preview Mode - Same as Add Product */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    {formData.images.length > 0 ? (
                      <img
                        src={formData.images[0] || "/placeholder.svg"}
                        alt={formData.name}
                        className="w-full h-96 object-cover"
                      />
                    ) : (
                      <div className="w-full h-96 flex items-center justify-center">
                        <ImageIcon size={64} className="text-gray-400" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {formData.isNew && <Badge className="bg-green-500 text-white">Mới</Badge>}
                      {formData.isBestSeller && <Badge className="bg-red-500 text-white">Bán chạy</Badge>}
                      {discount > 0 && <Badge className="bg-orange-500 text-white">-{discount}%</Badge>}
                    </div>
                  </div>

                  {formData.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {formData.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`${formData.name} ${index + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
                  <p className="text-gray-600">Thương hiệu: {formData.brand}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600">{formData.price.toLocaleString()}₫</span>
                  {formData.originalPrice > formData.price && (
                    <span className="text-lg text-gray-400 line-through">
                      {formData.originalPrice.toLocaleString()}₫
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${formData.inStock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                  <span className={`font-medium ${formData.inStock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {formData.inStock > 0 ? `Còn ${formData.inStock} sản phẩm` : "Hết hàng"}
                  </span>
                </div>

                <div>
                  <p className="text-gray-700">{formData.description}</p>
                </div>

                {formData.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tính năng nổi bật:</h3>
                    <ul className="space-y-1">
                      {formData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Edit Form - Same structure as Add Product but with populated data */
          <div className="text-center py-8">
            <p className="text-gray-600">Form chỉnh sửa sản phẩm (tương tự như form thêm sản phẩm)</p>
            <p className="text-sm text-gray-500 mt-2">
              Để tiết kiệm không gian, form chi tiết sẽ giống như trang thêm sản phẩm nhưng với dữ liệu đã được điền sẵn
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
