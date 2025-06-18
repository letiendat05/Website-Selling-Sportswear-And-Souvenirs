"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, TrendingUp, Eye, UserCheck } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  const stats = [
    {
      title: "Tổng người dùng",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Sản phẩm",
      value: "456",
      change: "+5%",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Đơn hàng",
      value: "789",
      change: "+18%",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Doanh thu",
      value: "₫125M",
      change: "+25%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivities = [
    { id: 1, action: "Người dùng mới đăng ký", user: "Nguyễn Văn A", time: "5 phút trước" },
    { id: 2, action: "Đơn hàng mới", user: "Trần Thị B", time: "10 phút trước" },
    { id: 3, action: "Sản phẩm được cập nhật", user: "Admin", time: "15 phút trước" },
    { id: 4, action: "Thanh toán thành công", user: "Lê Văn C", time: "20 phút trước" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hệ thống quản trị</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} so với tháng trước</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye size={20} />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">bởi {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck size={20} />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Quản lý User</p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                  <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Quản lý Sản phẩm</p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                  <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Quản lý Đơn hàng</p>
                </button>
                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
                  <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Báo cáo</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
