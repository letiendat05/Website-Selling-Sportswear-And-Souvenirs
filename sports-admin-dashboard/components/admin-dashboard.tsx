"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { ProductManagement } from "./product-management"
import { OrderManagement } from "./order-management"
import { CustomerManagement } from "./customer-management"
import { Settings } from "./settings"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "customers":
        return <CustomerManagement />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  const getBreadcrumbTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "Tổng quan"
      case "products":
        return "Quản lý sản phẩm"
      case "orders":
        return "Quản lý đơn hàng"
      case "customers":
        return "Quản lý khách hàng"
      case "settings":
        return "Cài đặt"
      default:
        return "Tổng quan"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Sports & Souvenirs Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
