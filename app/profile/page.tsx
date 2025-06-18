"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: "",
      address: "",
    })
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update user context
    if (user) {
      login({
        ...user,
        name: formData.name,
        email: formData.email,
      })
    }

    setIsEditing(false)
    setIsLoading(false)
    alert("Thông tin đã được cập nhật thành công!")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Thông tin cá nhân</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={40} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="w-full"
                >
                  {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Information Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Họ và tên
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Số điện thoại
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="Chưa cập nhật"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Địa chỉ
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                    placeholder="Chưa cập nhật"
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleSave} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                    <Save size={16} className="mr-2" />
                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
