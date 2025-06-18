"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, UserCheck, UserX } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  createdAt: string
  lastLogin: string
}

export default function UsersManagement() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/auth/login")
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    // Mock data - In real app, fetch from API
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-01",
        lastLogin: "2024-01-20",
      },
      {
        id: 2,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        role: "user",
        status: "active",
        createdAt: "2024-01-15",
        lastLogin: "2024-01-19",
      },
      {
        id: 3,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        role: "user",
        status: "active",
        createdAt: "2024-01-10",
        lastLogin: "2024-01-18",
      },
      {
        id: 4,
        name: "Lê Văn C",
        email: "levanc@example.com",
        role: "user",
        status: "inactive",
        createdAt: "2024-01-05",
        lastLogin: "2024-01-10",
      },
      {
        id: 5,
        name: "Phạm Thị D",
        email: "phamthid@example.com",
        role: "user",
        status: "active",
        createdAt: "2024-01-20",
        lastLogin: "2024-01-20",
      },
    ]
    setUsers(mockUsers)
  }, [])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  if (!user || !isAdmin) {
    return null
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleStatusToggle = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
            <p className="text-gray-600">Quản lý tài khoản và phân quyền người dùng</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Thêm người dùng
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">Tổng người dùng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Đang hoạt động</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {users.filter((u) => u.status === "inactive").length}
              </div>
              <div className="text-sm text-gray-600">Không hoạt động</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{users.filter((u) => u.role === "admin").length}</div>
              <div className="text-sm text-gray-600">Quản trị viên</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên</option>
                <option value="user">Người dùng</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Đăng nhập cuối</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                          {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell>{new Date(user.lastLogin).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit size={16} className="mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusToggle(user.id)}>
                              {user.status === "active" ? (
                                <>
                                  <UserX size={16} className="mr-2" />
                                  Vô hiệu hóa
                                </>
                              ) : (
                                <>
                                  <UserCheck size={16} className="mr-2" />
                                  Kích hoạt
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                              <Trash2 size={16} className="mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
