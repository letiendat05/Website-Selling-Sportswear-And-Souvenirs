"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Users, UserPlus, ShoppingBag } from "lucide-react"

export function CustomerManagement() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      totalOrders: 5,
      totalSpent: 15750000,
      lastOrder: "2025-01-13",
      status: "VIP",
      joinDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      totalOrders: 3,
      totalSpent: 8500000,
      lastOrder: "2025-01-13",
      status: "Thường",
      joinDate: "2024-06-20",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0369852147",
      address: "789 Đường DEF, Quận 3, TP.HCM",
      totalOrders: 8,
      totalSpent: 22300000,
      lastOrder: "2025-01-12",
      status: "VIP",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0741852963",
      address: "321 Đường GHI, Quận 4, TP.HCM",
      totalOrders: 1,
      totalSpent: 250000,
      lastOrder: "2025-01-12",
      status: "Mới",
      joinDate: "2025-01-12",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      phone: "0258147369",
      address: "654 Đường JKL, Quận 5, TP.HCM",
      totalOrders: 12,
      totalSpent: 35600000,
      lastOrder: "2025-01-11",
      status: "VIP",
      joinDate: "2023-11-05",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VIP":
        return <Badge className="bg-gold text-black">VIP</Badge>
      case "Thường":
        return <Badge variant="secondary">Thường</Badge>
      case "Mới":
        return <Badge variant="outline">Mới</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const customerStats = {
    total: customers.length,
    vip: customers.filter((c) => c.status === "VIP").length,
    new: customers.filter((c) => c.status === "Mới").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý khách hàng</h1>
        <p className="text-muted-foreground">Quản lý thông tin và theo dõi hoạt động của khách hàng</p>
      </div>

      {/* Customer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách VIP</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.vip}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách mới</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.totalRevenue.toLocaleString()}₫</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm khách hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>Tổng cộng {filteredCustomers.length} khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đơn cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">Tham gia: {customer.joinDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.totalSpent.toLocaleString()}₫</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Chi tiết khách hàng</DialogTitle>
                          <DialogDescription>Thông tin chi tiết về khách hàng</DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold">Thông tin cá nhân</h4>
                                <p>Tên: {selectedCustomer.name}</p>
                                <p>Email: {selectedCustomer.email}</p>
                                <p>SĐT: {selectedCustomer.phone}</p>
                                <p>Địa chỉ: {selectedCustomer.address}</p>
                                <p>Ngày tham gia: {selectedCustomer.joinDate}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Thống kê mua hàng</h4>
                                <p>Tổng đơn hàng: {selectedCustomer.totalOrders}</p>
                                <p>Tổng chi tiêu: {selectedCustomer.totalSpent.toLocaleString()}₫</p>
                                <p>Đơn hàng cuối: {selectedCustomer.lastOrder}</p>
                                <p>Trạng thái: {getStatusBadge(selectedCustomer.status)}</p>
                                <p>
                                  Trung bình/đơn:{" "}
                                  {Math.round(
                                    selectedCustomer.totalSpent / selectedCustomer.totalOrders,
                                  ).toLocaleString()}
                                  ₫
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
