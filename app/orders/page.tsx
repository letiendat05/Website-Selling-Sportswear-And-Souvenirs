"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"

interface Order {
  id: number
  items: Array<{
    name: string
    quantity: number
    price: number
    image: string
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  createdAt: string
  address: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // Mock orders data
    const mockOrders: Order[] = [
      {
        id: 1001,
        items: [
          {
            name: "Nike Mercurial Vapor 16 Elite Vini Jr",
            quantity: 1,
            price: 8500000,
            image:
              "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/69669444-60a6-44c4-8944-a076f01f8e0d/ZM+VAPOR+16+ELITE+FG+OLY.png",
          },
          {
            name: "Găng Tay Thủ Môn Nike Vapor Grip 3",
            quantity: 1,
            price: 1850000,
            image:
              "https://product.hstatic.net/200000476447/product/gang_tay_thu_mon_nike_vapor_grip_3_-_cn5650-765_299d5843c4a24173a5b6db3541556ce4_master.png",
          },
        ],
        total: 10350000,
        status: "delivered",
        paymentMethod: "COD",
        createdAt: "2024-01-15",
        address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
      },
      {
        id: 1002,
        items: [
          {
            name: "FFF Men Team 2024/25 Stadium Away",
            quantity: 2,
            price: 3500000,
            image:
              "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ab31ff23-134e-4a2e-98b3-f4a2dd67081b/NK+24%2F25+W+Rep+Jersey+Player.png",
          },
        ],
        total: 7000000,
        status: "shipped",
        paymentMethod: "Bank Transfer",
        createdAt: "2024-01-18",
        address: "456 Lê Lợi, Quận 3, TP.HCM",
      },
      {
        id: 1003,
        items: [
          {
            name: "Móc khóa lưu niệm",
            quantity: 3,
            price: 50000,
            image: "/placeholder.svg?height=150&width=200",
          },
        ],
        total: 150000,
        status: "processing",
        paymentMethod: "COD",
        createdAt: "2024-01-20",
        address: "789 Võ Văn Tần, Quận 10, TP.HCM",
      },
    ]
    setOrders(mockOrders)
  }, [user, router])

  if (!user) {
    return null
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", variant: "secondary" as const, icon: Clock },
      processing: { label: "Đang xử lý", variant: "default" as const, icon: Package },
      shipped: { label: "Đã gửi", variant: "outline" as const, icon: Truck },
      delivered: { label: "Đã giao", variant: "default" as const, icon: CheckCircle },
      cancelled: { label: "Đã hủy", variant: "destructive" as const, icon: Clock },
    }

    const config = statusConfig[status]
    const IconComponent = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent size={12} />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Chưa có đơn hàng nào</h2>
              <p className="text-gray-500 mb-6">Bạn chưa đặt đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!</p>
              <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                Mua sắm ngay
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Đơn hàng #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Đặt ngày: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-sm text-gray-600 mt-1">Thanh toán: {order.paymentMethod}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Số lượng: {item.quantity} x {item.price.toLocaleString()}₫
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{(item.quantity * item.price).toLocaleString()}₫</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Địa chỉ giao hàng:</span>
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Tổng cộng:</span>
                        <span className="text-xl font-bold text-green-600">{order.total.toLocaleString()}₫</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye size={16} />
                        Xem chi tiết
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Đánh giá sản phẩm
                        </Button>
                      )}
                      {(order.status === "pending" || order.status === "processing") && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Hủy đơn hàng
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
