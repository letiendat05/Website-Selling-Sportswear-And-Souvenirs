"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo credentials - Hidden for security
      if (formData.email === "admin@example.com" && formData.password === "admin123") {
        const adminUser = {
          id: 1,
          name: "Admin",
          email: formData.email,
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin" as const,
          status: "active" as const,
          createdAt: "2024-01-01",
        }
        login(adminUser)
        router.push("/admin")
      } else if (formData.email === "demo@example.com" && formData.password === "123456") {
        const demoUser = {
          id: 2,
          name: "Demo User",
          email: formData.email,
          avatar: "/placeholder.svg?height=40&width=40",
          role: "user" as const,
          status: "active" as const,
          createdAt: "2024-01-15",
        }
        login(demoUser)
        router.push("/")
      } else {
        setError("Email hoặc mật khẩu không chính xác!")
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          {t("auth.backToHome")}
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🏀</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">{t("auth.login")}</CardTitle>
            <p className="text-gray-600">Chào mừng bạn trở lại!</p>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("auth.email")}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email của bạn"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("auth.password")}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Ghi nhớ đăng nhập
                </label>
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base font-medium"
              >
                {isLoading ? "Đang đăng nhập..." : t("auth.login")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  {t("auth.register")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
