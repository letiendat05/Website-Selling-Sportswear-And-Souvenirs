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
import { Search, MoreHorizontal, Eye, Truck, CheckCircle, XCircle } from "lucide-react"

interface Order {
  id: number
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  createdAt: string
  address: string
}

export default function OrdersManagement() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    // Mock data - In real app, fetch from API
    const mockOrders: Order[] = [
      {
        id: 1001,
        customerName: "Nguyễn Văn A",
        customerEmail: "nguyenvana@example.com",
        items: [
          { name: "Nike Mercurial Vapor 16", quantity: 1, price: 8500000 },
          { name: "Găng Tay Thủ Môn", quantity: 1, price: 1850000 },
        ],
        total: 10350000,
        status: "pending",
        paymentMethod: "COD",
        createdAt: "2024-01-20",
        address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
      },
      {
        id: 1002,
        customerName: "Trần Thị B",
        customerEmail: "tranthib@example.com",
        items: [{ name: "FFF Men Team Jersey", quantity: 2, price: 3500000 }],
        total: 7000000,
        status: "processing",
        paymentMethod: "Bank Transfer",
        createdAt: "2024-01-19",
        address: "456 Lê Lợi, Quận 3, TP.HCM",
      },
      {
        id: 1003,
        customerName: "Lê Văn C",
        customerEmail: "levanc@example.com",
        items: [
          { name: "Móc khóa lưu niệm", quantity: 5, price: 50000 },
          { name: "Áo thể thao nam", quantity: 1, price: 250000 },
        ],
        total: 500000,
        status: "shipped",
        paymentMethod: "COD",
        createdAt: "2024-01-18",
        address: "789 Võ Văn Tần, Quận 10, TP.HCM",
      },
      {
        id: 1004,
        customerName: "Phạm Thị D",
        customerEmail: "phamthid@example.com",
        items: [{ name: "Bình nước thể thao", quantity: 3, price: 150000 }],
        total: 450000,
        status: "delivered",
        paymentMethod: "COD",
        createdAt: "2024-01-17",
        address: "321 Hai Bà Trưng, Quận 1, TP.HCM",
      },
      {
        id: 1005,
        customerName: "Hoàng Văn E",
        customerEmail: "hoangvane@example.com",
        items: [{ name: "Nike Mercurial Vapor 16", quantity: 1, price: 8500000 }],
        total: 8500000,
        status: "cancelled",
        paymentMethod: "Bank Transfer",
        createdAt: "2024-01-16",
        address: "654 Nguyễn Huệ, Quận 1, TP.HCM",
      },
    ]
    setOrders(mockOrders)
  }, [])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      processing: { label: "Đang xử lý", variant: "default" as const },
      shipped: { label: "Đã gửi", variant: "outline" as const },
      delivered: { label: "Đã giao", variant: "default" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "text-yellow-600",
      processing: "text-blue-600",
      shipped: "text-purple-600",
      delivered: "text-green-600",
      cancelled: "text-red-600",
    }
    return colors[status]
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Theo dõi và xử lý đơn hàng của khách hàng</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
              <div className="text-sm text-gray-600">Tổng đơn hàng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter((o) => o.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Chờ xử lý</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {orders.filter((o) => o.status === "shipped").length}
              </div>
              <div className="text-sm text-gray-600">Đã gửi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter((o) => o.status === "delivered").length}
              </div>
              <div className="text-sm text-gray-600">Đã giao</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                ₫{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Tổng doanh thu</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Tìm kiếm theo tên, email hoặc mã đơn hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã gửi</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{order.total.toLocaleString()}₫</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</TableCell>
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
                            {order.status === "pending" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "processing")}>
                                <CheckCircle size={16} className="mr-2" />
                                Xác nhận đơn hàng
                              </DropdownMenuItem>
                            )}
                            {order.status === "processing" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "shipped")}>
                                <Truck size={16} className="mr-2" />
                                Đánh dấu đã gửi
                              </DropdownMenuItem>
                            )}
                            {order.status === "shipped" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(order.id, "delivered")}>
                                <CheckCircle size={16} className="mr-2" />
                                Đánh dấu đã giao
                              </DropdownMenuItem>
                            )}
                            {(order.status === "pending" || order.status === "processing") && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(order.id, "cancelled")}
                                className="text-red-600"
                              >
                                <XCircle size={16} className="mr-2" />
                                Hủy đơn hàng
                              </DropdownMenuItem>
                            )}
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
