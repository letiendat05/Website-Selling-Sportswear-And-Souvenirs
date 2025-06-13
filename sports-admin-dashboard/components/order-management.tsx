"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Package, Truck } from "lucide-react"

export function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-001",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      products: [{ name: "Nike Mercurial Vapor 16", quantity: 1, price: 8500000 }],
      total: 8500000,
      status: "Đã thanh toán",
      paymentMethod: "Thẻ tín dụng",
      date: "2025-01-13",
      time: "14:30",
    },
    {
      id: "#ORD-002",
      customer: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      products: [{ name: "Áo thể thao FFF", quantity: 2, price: 3500000 }],
      total: 7000000,
      status: "Đang xử lý",
      paymentMethod: "Chuyển khoản",
      date: "2025-01-13",
      time: "10:15",
    },
    {
      id: "#ORD-003",
      customer: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0369852147",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      products: [
        { name: "Găng tay thủ môn", quantity: 1, price: 1850000 },
        { name: "Bình nước thể thao", quantity: 2, price: 150000 },
      ],
      total: 2150000,
      status: "Đã giao",
      paymentMethod: "Tiền mặt",
      date: "2025-01-12",
      time: "16:45",
    },
    {
      id: "#ORD-004",
      customer: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0741852963",
      address: "321 Đường GHI, Quận 4, TP.HCM",
      products: [{ name: "Móc khóa lưu niệm", quantity: 5, price: 50000 }],
      total: 250000,
      status: "Đang giao",
      paymentMethod: "Ví điện tử",
      date: "2025-01-12",
      time: "09:20",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const statuses = ["Đang xử lý", "Đã thanh toán", "Đang giao", "Đã giao", "Đã hủy"]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return <Badge variant="default">Đã thanh toán</Badge>
      case "Đang xử lý":
        return <Badge variant="secondary">Đang xử lý</Badge>
      case "Đang giao":
        return <Badge className="bg-blue-500">Đang giao</Badge>
      case "Đã giao":
        return <Badge className="bg-green-500">Đã giao</Badge>
      case "Đã hủy":
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý đơn hàng</h1>
        <p className="text-muted-foreground">Theo dõi và quản lý tất cả đơn hàng của khách hàng</p>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Đang xử lý").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang giao</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Đang giao").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã hoàn thành</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Đã giao").length}</div>
          </CardContent>
        </Card>
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
                  placeholder="Tìm kiếm theo mã đơn hàng hoặc tên khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>Tổng cộng {filteredOrders.length} đơn hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.total.toLocaleString()}₫</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.date}</div>
                      <div className="text-sm text-muted-foreground">{order.time}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Chi tiết đơn hàng {order.id}</DialogTitle>
                            <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Thông tin khách hàng</h4>
                                  <p>Tên: {selectedOrder.customer}</p>
                                  <p>Email: {selectedOrder.email}</p>
                                  <p>SĐT: {selectedOrder.phone}</p>
                                  <p>Địa chỉ: {selectedOrder.address}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Thông tin đơn hàng</h4>
                                  <p>Mã: {selectedOrder.id}</p>
                                  <p>
                                    Ngày: {selectedOrder.date} {selectedOrder.time}
                                  </p>
                                  <p>Thanh toán: {selectedOrder.paymentMethod}</p>
                                  <p>Trạng thái: {getStatusBadge(selectedOrder.status)}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Sản phẩm</h4>
                                <div className="space-y-2">
                                  {selectedOrder.products.map((product: any, index: number) => (
                                    <div key={index} className="flex justify-between">
                                      <span>
                                        {product.name} x {product.quantity}
                                      </span>
                                      <span>{(product.price * product.quantity).toLocaleString()}₫</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="border-t pt-2 mt-2">
                                  <div className="flex justify-between font-semibold">
                                    <span>Tổng cộng:</span>
                                    <span>{selectedOrder.total.toLocaleString()}₫</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Cập nhật trạng thái</h4>
                                <Select
                                  value={selectedOrder.status}
                                  onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statuses.map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
