"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Download,
  Calendar,
} from "lucide-react"

export default function ReportsPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("month")

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

  const salesData = [
    { month: "T1", revenue: 125000000, orders: 45 },
    { month: "T2", revenue: 135000000, orders: 52 },
    { month: "T3", revenue: 145000000, orders: 48 },
    { month: "T4", revenue: 155000000, orders: 61 },
    { month: "T5", revenue: 165000000, orders: 58 },
    { month: "T6", revenue: 175000000, orders: 67 },
  ]

  const topProducts = [
    { name: "Nike Mercurial Vapor 16", sold: 25, revenue: 212500000 },
    { name: "FFF Men Team Jersey", sold: 18, revenue: 63000000 },
    { name: "Găng Tay Thủ Môn", sold: 15, revenue: 27750000 },
    { name: "Áo thể thao nam", sold: 32, revenue: 8000000 },
    { name: "Móc khóa lưu niệm", sold: 45, revenue: 2250000 },
  ]

  const customerStats = [
    { label: "Khách hàng mới", value: 156, change: "+12%", trend: "up" },
    { label: "Khách hàng quay lại", value: 89, change: "+8%", trend: "up" },
    { label: "Tỷ lệ chuyển đổi", value: "3.2%", change: "-0.5%", trend: "down" },
    { label: "Giá trị đơn hàng TB", value: "2.1M", change: "+15%", trend: "up" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
            <p className="text-gray-600">Phân tích dữ liệu kinh doanh và hiệu suất</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
              <option value="quarter">3 tháng qua</option>
              <option value="year">12 tháng qua</option>
            </select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download size={16} className="mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doanh thu tháng này</p>
                  <p className="text-2xl font-bold text-gray-900">₫175M</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    +12% so với tháng trước
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-50">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">67</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    +8% so với tháng trước
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-50">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Khách hàng mới</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-sm text-red-600 flex items-center">
                    <TrendingDown size={16} className="mr-1" />
                    -3% so với tháng trước
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-50">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sản phẩm bán</p>
                  <p className="text-2xl font-bold text-gray-900">135</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    +18% so với tháng trước
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-50">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={20} />
                Biểu đồ doanh thu 6 tháng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 text-sm font-medium">{data.month}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.revenue / 175000000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₫{(data.revenue / 1000000).toFixed(0)}M</p>
                      <p className="text-sm text-gray-500">{data.orders} đơn</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={20} />
                Sản phẩm bán chạy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Đã bán: {product.sold}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₫{(product.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Phân tích khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {customerStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p
                    className={`text-sm flex items-center justify-center ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download size={20} />
              Xuất báo cáo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar size={16} />
                Báo cáo doanh thu
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Users size={16} />
                Báo cáo khách hàng
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Package size={16} />
                Báo cáo sản phẩm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
