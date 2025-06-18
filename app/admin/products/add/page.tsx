"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Upload, X, Plus, Save, Eye, ImageIcon, Package, Tag, DollarSign, Info } from "lucide-react"

interface ProductFormData {
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

export default function AddProductPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newTag, setNewTag] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "",
    brand: "",
    inStock: 0,
    images: [],
    features: [],
    specifications: {},
    isNew: false,
    isBestSeller: false,
    isActive: true,
    tags: [],
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const addImage = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }))
      setImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim() && !formData.specifications[newSpecKey.trim()]) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }))
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return {
        ...prev,
        specifications: newSpecs,
      }
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, send formData to API
      console.log("Product data:", formData)

      alert("Sản phẩm đã được thêm thành công!")
      router.push("/admin/products")
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm sản phẩm!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
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
              <h1 className="text-3xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
              <p className="text-gray-600">Tạo sản phẩm mới cho cửa hàng</p>
            </div>
          </div>
          <div className="flex gap-3">
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
              {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
            </Button>
          </div>
        </div>

        {previewMode ? (
          /* Preview Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images Preview */}
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

                    {/* Badges */}
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

            {/* Product Info Preview */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name || "Tên sản phẩm"}</h1>
                  <p className="text-gray-600">Thương hiệu: {formData.brand || "Chưa có"}</p>
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
                  <p className="text-gray-700">{formData.description || "Chưa có mô tả"}</p>
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
          /* Edit Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Product Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package size={20} />
                    Thông tin cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Nhập tên sản phẩm"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả sản phẩm *</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Nhập mô tả chi tiết về sản phẩm"
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu *</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.brand ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Chọn thương hiệu</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                      {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign size={20} />
                    Giá cả & Tồn kho
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Giá bán *</label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Giá gốc</label>
                      <Input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tồn kho</label>
                      <Input
                        type="number"
                        value={formData.inStock}
                        onChange={(e) => handleInputChange("inStock", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className={errors.inStock ? "border-red-500" : ""}
                      />
                      {errors.inStock && <p className="text-red-500 text-sm mt-1">{errors.inStock}</p>}
                    </div>
                  </div>

                  {discount > 0 && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-orange-800 font-medium">
                        Giảm giá: {discount}% (Tiết kiệm {(formData.originalPrice - formData.price).toLocaleString()}₫)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon size={20} />
                    Hình ảnh sản phẩm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Nhập URL hình ảnh"
                      className="flex-1"
                    />
                    <Button onClick={addImage} disabled={!imageUrl.trim()}>
                      <Plus size={16} />
                    </Button>
                  </div>

                  {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                          {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs">Chính</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info size={20} />
                    Tính năng nổi bật
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Nhập tính năng"
                      className="flex-1"
                    />
                    <Button onClick={addFeature} disabled={!newFeature.trim()}>
                      <Plus size={16} />
                    </Button>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{feature}</span>
                          <button onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông số kỹ thuật</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Tên thông số"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        placeholder="Giá trị"
                        className="flex-1"
                      />
                      <Button onClick={addSpecification} disabled={!newSpecKey.trim() || !newSpecValue.trim()}>
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  {Object.keys(formData.specifications).length > 0 && (
                    <div className="space-y-2">
                      {Object.entries(formData.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">
                            <strong>{key}:</strong> {value}
                          </span>
                          <button onClick={() => removeSpecification(key)} className="text-red-500 hover:text-red-700">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Kích hoạt</label>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Sản phẩm mới</label>
                    <Switch
                      checked={formData.isNew}
                      onCheckedChange={(checked) => handleInputChange("isNew", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Bán chạy</label>
                    <Switch
                      checked={formData.isBestSeller}
                      onCheckedChange={(checked) => handleInputChange("isBestSeller", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag size={20} />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Nhập tag"
                      className="flex-1"
                    />
                    <Button onClick={addTag} disabled={!newTag.trim()}>
                      <Plus size={16} />
                    </Button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <button onClick={() => removeTag(index)} className="text-red-500 hover:text-red-700">
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload size={16} className="mr-2" />
                    Upload từ file
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package size={16} className="mr-2" />
                    Sao chép từ sản phẩm khác
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
