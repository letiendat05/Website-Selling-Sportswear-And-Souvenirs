"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search } from "lucide-react"

export function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Mercurial Vapor 16 Elite Vini Jr",
      category: "Giày đá bóng",
      price: 8500000,
      stock: 15,
      status: "Còn hàng",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "FFF Men Team 2024/25 Stadium Away",
      category: "Áo thể thao",
      price: 3500000,
      stock: 25,
      status: "Còn hàng",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
      category: "Phụ kiện",
      price: 1850000,
      stock: 8,
      status: "Sắp hết",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Bình nước thể thao",
      category: "Phụ kiện",
      price: 150000,
      stock: 50,
      status: "Còn hàng",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Móc khóa lưu niệm",
      category: "Quà lưu niệm",
      price: 50000,
      stock: 0,
      status: "Hết hàng",
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["Áo thể thao", "Giày đá bóng", "Phụ kiện", "Quà lưu niệm"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Còn hàng":
        return <Badge variant="default">Còn hàng</Badge>
      case "Sắp hết":
        return <Badge variant="secondary">Sắp hết</Badge>
      case "Hết hàng":
        return <Badge variant="destructive">Hết hàng</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddProduct = () => {
    // Add product logic here
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">Quản lý tất cả sản phẩm trong cửa hàng của bạn</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
              <DialogDescription>Nhập thông tin sản phẩm mới vào form bên dưới.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tên sản phẩm
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Danh mục
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Giá (₫)
                </Label>
                <Input id="price" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Số lượng
                </Label>
                <Input id="stock" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô tả
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>
                Thêm sản phẩm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>Tổng cộng {filteredProducts.length} sản phẩm</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price.toLocaleString()}₫</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
