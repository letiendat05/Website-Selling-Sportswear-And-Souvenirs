import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "125,500,000₫",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Đơn hàng mới",
      value: "48",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Sản phẩm",
      value: "156",
      change: "+3",
      icon: Package,
      trend: "up",
    },
    {
      title: "Khách hàng",
      value: "1,234",
      change: "+15.3%",
      icon: Users,
      trend: "up",
    },
  ]

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Nguyễn Văn A",
      product: "Nike Mercurial Vapor 16",
      amount: "8,500,000₫",
      status: "Đã thanh toán",
      date: "2025-01-13",
    },
    {
      id: "#ORD-002",
      customer: "Trần Thị B",
      product: "Áo thể thao FFF",
      amount: "3,500,000₫",
      status: "Đang xử lý",
      date: "2025-01-13",
    },
    {
      id: "#ORD-003",
      customer: "Lê Văn C",
      product: "Găng tay thủ môn",
      amount: "1,850,000₫",
      status: "Đã giao",
      date: "2025-01-12",
    },
  ]

  const topProducts = [
    {
      name: "Nike Mercurial Vapor 16",
      sales: 45,
      revenue: "382,500,000₫",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Áo thể thao FFF",
      sales: 32,
      revenue: "112,000,000₫",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Găng tay thủ môn",
      sales: 28,
      revenue: "51,800,000₫",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tổng quan Dashboard</h1>
        <p className="text-muted-foreground">Chào mừng trở lại! Đây là tổng quan về cửa hàng của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`inline-flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>{" "}
                so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>Danh sách các đơn hàng mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} • {order.product}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Đã thanh toán"
                          ? "default"
                          : order.status === "Đang xử lý"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
            <CardDescription>Top sản phẩm có doanh thu cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} đã bán</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
