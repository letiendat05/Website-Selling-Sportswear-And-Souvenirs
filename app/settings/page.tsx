"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Eye, Mail, Smartphone, Globe, Trash2, Save, Lock } from "lucide-react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      promotions: false,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
    },
    preferences: {
      language: "vi",
      currency: "VND",
      theme: "light",
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("Cài đặt đã được lưu thành công!")
  }

  const handleDeleteAccount = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
      if (confirm("Xác nhận lần cuối: Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn!")) {
        logout()
        router.push("/")
        alert("Tài khoản đã được xóa thành công!")
      }
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Cài đặt tài khoản</h1>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Thông báo qua Email</p>
                    <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Thông báo SMS</p>
                    <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Thông báo đẩy</p>
                    <p className="text-sm text-gray-500">Nhận thông báo trên trình duyệt</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cập nhật đơn hàng</p>
                  <p className="text-sm text-gray-500">Thông báo về trạng thái đơn hàng</p>
                </div>
                <Switch
                  checked={settings.notifications.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Khuyến mãi</p>
                  <p className="text-sm text-gray-500">Thông báo về ưu đãi và khuyến mãi</p>
                </div>
                <Switch
                  checked={settings.notifications.promotions}
                  onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Quyền riêng tư
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">Hiển thị hồ sơ công khai</p>
                    <p className="text-sm text-gray-500">Cho phép người khác xem hồ sơ của bạn</p>
                  </div>
                </div>
                <Switch
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) => handlePrivacyChange("profileVisible", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hiển thị email</p>
                  <p className="text-sm text-gray-500">Cho phép người khác xem email của bạn</p>
                </div>
                <Switch
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hiển thị số điện thoại</p>
                  <p className="text-sm text-gray-500">Cho phép người khác xem số điện thoại</p>
                </div>
                <Switch
                  checked={settings.privacy.showPhone}
                  onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} />
                Tùy chọn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange("language", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Đơn vị tiền tệ</label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VND">VND (₫)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giao diện</label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handlePreferenceChange("theme", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="auto">Tự động</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                Bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock size={16} className="mr-2" />
                Đổi mật khẩu
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Shield size={16} className="mr-2" />
                Xác thực 2 bước
              </Button>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="flex gap-4">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Save size={16} className="mr-2" />
              {isLoading ? "Đang lưu..." : "Lưu cài đặt"}
            </Button>
          </div>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Trash2 size={20} />
                Vùng nguy hiểm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn tác.
              </p>
              <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                <Trash2 size={16} className="mr-2" />
                Xóa tài khoản
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
