"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import UserMenu from "@/components/user-menu"
import LanguageSwitcher from "@/components/language-switcher"

export default function Header() {
  const { items } = useCart()
  const { t } = useLanguage()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          🏀 Sports & Souvenirs
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="font-medium hover:opacity-80 transition-opacity">
            {t("header.home")}
          </Link>
          <Link href="#" className="font-medium hover:opacity-80 transition-opacity">
            {t("header.products")}
          </Link>
          <Link href="/cart" className="font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
            <ShoppingCart size={20} />
            {t("header.cart")} ({itemCount})
          </Link>
          <LanguageSwitcher />
          <UserMenu />
        </nav>
      </div>
    </header>
  )
}
