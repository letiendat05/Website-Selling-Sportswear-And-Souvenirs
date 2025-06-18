"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Store, Mail, Bell, Shield, Database, Save, Upload, CreditCard } from "lucide-react"

export default function AdminSettingsPage() {
  const { user, isAdmin, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [settings, setSettings] = useState({
    store: {
      name: "Sports & Souvenirs",
      description: "Cửa hàng đồ thể thao và quà lưu niệm chất lượng cao",
      email: "contact@sportssouvenirs.com",
      phone: "0123456789",
      address: "123 Nguyễn Trãi, Quận 1, TP.HCM",
      website: "https://sportssouvenirs.com",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      orderAlerts: true,
      lowStockAlerts: true,
      newUserAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      cacheEnabled: true,
      autoBackup: true,
    },
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, authLoading, router])

  const handleStoreChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      store: {
        ...prev.store,
        [key]: value,
      },
    }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handleSecurityChange = (key: string, value: boolean | number) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }))
  }

  const handleSystemChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    alert("Cài đặt đã được lưu thành công!")
  }

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
            <p className="text-gray-600">Quản lý cấu hình và thiết lập hệ thống</p>
          </div>
          <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            <Save size={16} className="mr-2" />
            {isSaving ? "Đang lưu..." : "Lưu tất cả"}
          </Button>
        </div>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store size={20} />
              Thông tin cửa hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên cửa hàng</label>
                <Input value={settings.store.name} onChange={(e) => handleStoreChange("name", e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <Input value={settings.store.website} onChange={(e) => handleStoreChange("website", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <Textarea
                value={settings.store.description}
                onChange={(e) => handleStoreChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email liên hệ</label>
                <Input
                  type="email"
                  value={settings.store.email}
                  onChange={(e) => handleStoreChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <Input value={settings.store.phone} onChange={(e) => handleStoreChange("phone", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
              <Textarea
                value={settings.store.address}
                onChange={(e) => handleStoreChange("address", e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Cài đặt thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-500" />
                <div>
                  <p className="font-medium">Thông báo Email</p>
                  <p className="text-sm text-gray-500">Gửi thông báo qua email</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications.emailNotifications}
                onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cảnh báo đơn hàng mới</p>
                <p className="text-sm text-gray-500">Thông báo khi có đơn hàng mới</p>
              </div>
              <Switch
                checked={settings.notifications.orderAlerts}
                onCheckedChange={(checked) => handleNotificationChange("orderAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cảnh báo hết hàng</p>
                <p className="text-sm text-gray-500">Thông báo khi sản phẩm sắp hết</p>
              </div>
              <Switch
                checked={settings.notifications.lowStockAlerts}
                onCheckedChange={(checked) => handleNotificationChange("lowStockAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo người dùng mới</p>
                <p className="text-sm text-gray-500">Thông báo khi có người dùng đăng ký</p>
              </div>
              <Switch
                checked={settings.notifications.newUserAlerts}
                onCheckedChange={(checked) => handleNotificationChange("newUserAlerts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Xác thực 2 bước</p>
                <p className="text-sm text-gray-500">Bật xác thực 2 bước cho admin</p>
              </div>
              <Switch
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian hết hạn phiên (phút)</label>
                <Input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSecurityChange("sessionTimeout", Number.parseInt(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số lần đăng nhập sai tối đa</label>
                <Input
                  type="number"
                  value={settings.security.loginAttempts}
                  onChange={(e) => handleSecurityChange("loginAttempts", Number.parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} />
              Cài đặt hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chế độ bảo trì</p>
                <p className="text-sm text-gray-500">Tạm thời tắt website cho người dùng</p>
              </div>
              <Switch
                checked={settings.system.maintenanceMode}
                onCheckedChange={(checked) => handleSystemChange("maintenanceMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bật cache</p>
                <p className="text-sm text-gray-500">Tăng tốc độ tải trang</p>
              </div>
              <Switch
                checked={settings.system.cacheEnabled}
                onCheckedChange={(checked) => handleSystemChange("cacheEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tự động sao lưu</p>
                <p className="text-sm text-gray-500">Sao lưu dữ liệu hàng ngày</p>
              </div>
              <Switch
                checked={settings.system.autoBackup}
                onCheckedChange={(checked) => handleSystemChange("autoBackup", checked)}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload size={16} />
                Sao lưu dữ liệu
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Database size={16} />
                Khôi phục dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard size={20} />
              Cài đặt thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phí vận chuyển mặc định (₫)</label>
                <Input type="number" placeholder="30000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Miễn phí vận chuyển từ (₫)</label>
                <Input type="number" placeholder="500000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thông tin chuyển khoản</label>
              <Textarea
                placeholder="Ngân hàng: Vietcombank\nSố tài khoản: 1234567890\nChủ tài khoản: Sports & Souvenirs"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
