"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Store, Bell, Shield, Mail, Save } from "lucide-react"

export function Settings() {
  const [settings, setSettings] = useState({
    storeName: "Sports & Souvenirs",
    storeDescription: "Cửa hàng đồ thể thao và quà lưu niệm chất lượng cao",
    storeEmail: "contact@sportssouvenirs.com",
    storePhone: "0123456789",
    storeAddress: "123 Đường ABC, Quận 1, TP.HCM",
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    customerNotifications: false,
    darkMode: false,
    autoBackup: true,
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt cửa hàng và tùy chọn hệ thống</p>
      </div>

      <div className="grid gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Thông tin cửa hàng
            </CardTitle>
            <CardDescription>Cập nhật thông tin cơ bản về cửa hàng của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Tên cửa hàng</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email cửa hàng</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Mô tả cửa hàng</Label>
              <Textarea
                id="storeDescription"
                value={settings.storeDescription}
                onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storePhone">Số điện thoại</Label>
                <Input
                  id="storePhone"
                  value={settings.storePhone}
                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Địa chỉ</Label>
                <Input
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Thông báo
            </CardTitle>
            <CardDescription>Cấu hình các loại thông báo bạn muốn nhận</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo email</Label>
                <p className="text-sm text-muted-foreground">Nhận thông báo qua email về hoạt động cửa hàng</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo đơn hàng mới</Label>
                <p className="text-sm text-muted-foreground">Thông báo khi có đơn hàng mới</p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh báo hết hàng</Label>
                <p className="text-sm text-muted-foreground">Thông báo khi sản phẩm sắp hết hàng</p>
              </div>
              <Switch
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlerts: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo khách hàng mới</Label>
                <p className="text-sm text-muted-foreground">Thông báo khi có khách hàng đăng ký mới</p>
              </div>
              <Switch
                checked={settings.customerNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, customerNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cài đặt hệ thống
            </CardTitle>
            <CardDescription>Cấu hình các tùy chọn hệ thống và bảo mật</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chế độ tối</Label>
                <p className="text-sm text-muted-foreground">Bật/tắt giao diện tối cho admin dashboard</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự động sao lưu</Label>
                <p className="text-sm text-muted-foreground">Tự động sao lưu dữ liệu hàng ngày</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Cài đặt Email
            </CardTitle>
            <CardDescription>Cấu hình email server để gửi thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input id="smtpHost" placeholder="smtp.gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input id="smtpPort" placeholder="587" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input id="smtpUser" placeholder="your-email@gmail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input id="smtpPassword" type="password" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-32">
            <Save className="mr-2 h-4 w-4" />
            Lưu cài đặt
          </Button>
        </div>
      </div>
    </div>
  )
}
