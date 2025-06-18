"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setDiscount(0.1)
      alert("Mã giảm giá 10% đã được áp dụng!")
    } else if (couponCode.toLowerCase() === "save20") {
      setDiscount(0.2)
      alert("Mã giảm giá 20% đã được áp dụng!")
    } else {
      alert("Mã giảm giá không hợp lệ!")
    }
  }

  const subtotal = getTotalPrice()
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Giỏ hàng của bạn</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-bold">{item.price.toLocaleString()}₫</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{(item.price * item.quantity).toLocaleString()}₫</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt đơn hàng</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString()}₫</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({discount * 100}%):</span>
                    <span>-{discountAmount.toLocaleString()}₫</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">{total.toLocaleString()}₫</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon} variant="outline" className="whitespace-nowrap">
                    Áp dụng
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Thử: "discount10" hoặc "save20"</p>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Tiến hành thanh toán</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
