"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
  image: string
  createdAt: string
}

export default function ProductsManagement() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    // Mock data - In real app, fetch from API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Nike Mercurial Vapor 16 Elite Vini Jr",
        category: "accessories",
        price: 8500000,
        stock: 15,
        status: "active",
        image:
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        name: "FFF Men Team 2024/25 Stadium Away",
        category: "clothing",
        price: 3500000,
        stock: 25,
        status: "active",
        image:
          "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
        createdAt: "2024-01-05",
      },
      {
        id: 3,
        name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
        category: "accessories",
        price: 1850000,
        stock: 8,
        status: "active",
        image:
          "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
        createdAt: "2024-01-10",
      },
      {
        id: 4,
        name: "Áo thể thao nam",
        category: "clothing",
        price: 250000,
        stock: 0,
        status: "inactive",
        image: "/placeholder.svg?height=150&width=200",
        createdAt: "2024-01-15",
      },
      {
        id: 5,
        name: "Móc khóa lưu niệm",
        category: "souvenirs",
        price: 50000,
        stock: 100,
        status: "active",
        image: "/placeholder.svg?height=150&width=200",
        createdAt: "2024-01-20",
      },
    ]
    setProducts(mockProducts)
  }, [])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleStatusToggle = (productId: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: product.status === "active" ? "inactive" : "active" }
          : product,
      ),
    )
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      clothing: "Áo thể thao",
      accessories: "Phụ kiện",
      souvenirs: "Quà lưu niệm",
    }
    return categories[category] || category
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
            <p className="text-gray-600">Quản lý danh mục và thông tin sản phẩm</p>
          </div>
          <Button onClick={() => router.push("/admin/products/add")} className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-600">Tổng sản phẩm</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Đang bán</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{products.filter((p) => p.stock === 0).length}</div>
              <div className="text-sm text-gray-600">Hết hàng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
              <div className="text-sm text-gray-600">Tổng tồn kho</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="clothing">Áo thể thao</option>
                <option value="accessories">Phụ kiện</option>
                <option value="souvenirs">Quà lưu niệm</option>
              </select>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getCategoryName(product.category)}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{product.price.toLocaleString()}₫</TableCell>
                      <TableCell>
                        <span className={product.stock === 0 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>
                          {product.status === "active" ? "Đang bán" : "Ngừng bán"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(product.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye size={16} className="mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={16} className="mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusToggle(product.id)}>
                              {product.status === "active" ? "Ngừng bán" : "Bắt đầu bán"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                              <Trash2 size={16} className="mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
