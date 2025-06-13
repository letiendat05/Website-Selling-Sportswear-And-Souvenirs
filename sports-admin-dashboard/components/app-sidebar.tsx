"use client"

import type * as React from "react"
import { LayoutDashboard, Package, ShoppingCart, Users, SettingsIcon, Store } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Tổng quan",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      title: "Quản lý sản phẩm",
      icon: Package,
      id: "products",
    },
    {
      title: "Quản lý đơn hàng",
      icon: ShoppingCart,
      id: "orders",
    },
    {
      title: "Quản lý khách hàng",
      icon: Users,
      id: "customers",
    },
    {
      title: "Cài đặt",
      icon: SettingsIcon,
      id: "settings",
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="cursor-pointer">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Sports & Souvenirs</span>
                  <span className="">Admin Dashboard</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <div className="cursor-pointer">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
