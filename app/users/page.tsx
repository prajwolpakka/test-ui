"use client";

import { Button } from "@prajwolpakka/antd-extended";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Form, Input, Modal, Select, message } from "antd";
import type { User } from "@/lib/data/users";
import { useState } from "react";
import { UsersHeader } from "./components/UsersHeader";
import { UsersToolbar } from "./components/UsersToolbar";
import { UsersTable } from "./components/UsersTable";
import { UserDetailsDrawer } from "./components/UserDetailsDrawer";

const { Option } = Select;

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
 
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: Omit<User, "id" | "createdAt" | "lastLogin">) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowForm(false);
      form.resetFields();
      setEditingUser(null);
      message.success("User created successfully");
    },
    onError: () => {
      message.error("Failed to create user");
    },
  });

    const updateUserMutation = useMutation({
    mutationFn: async ({ id, userData }: { id: number; userData: Partial<User> }) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setShowForm(false);
      form.resetFields();
      setEditingUser(null);
      message.success("User updated successfully");
    },
    onError: () => {
      message.error("Failed to update user");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete user");
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase())) &&
      (!roleFilter || user.role === roleFilter) &&
      (!statusFilter || user.status === statusFilter),
  );

  const handleSubmit = async (values: any) => {
    if (editingUser) {
      updateUserMutation.mutate({
        id: editingUser.id,
        userData: values,
      });
    } else {
      createUserMutation.mutate(values);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      phone: user.phone,
      bio: user.bio,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleCancel = () => {
    form.resetFields();
    setShowForm(false);
    setEditingUser(null);
  };

  const openDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const onClearFilters = () => {
    setRoleFilter(null);
    setStatusFilter(null);
    setSearch("");
  };

  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 280 }}
      >
        <div style={{ textAlign: "center", color: "#666" }}>Loading...</div>
      </div>
    );

  if (error)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 280 }}
      >
        <div style={{ textAlign: "center", color: "#e53e3e" }}>
          An error occurred: {(error as Error).message}
        </div>
      </div>
    );

  return (
    <div>
      <UsersHeader />

      <UsersToolbar
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddUser={() => setShowForm(true)}
        onClear={onClearFilters}
      />

      <Modal
          title={
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              {editingUser ? "Edit User" : "Add New User"}
            </div>
          }
          open={showForm}
          onCancel={handleCancel}
          footer={null}
          width={720}
          styles={{
            body: {
              boxShadow: "none",
              padding: "16px",
            },
            header: {
              borderBottom: "1px solid #e5e7eb",
              padding: "12px 16px",
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              role: "User",
              status: "Active",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <Form.Item
                name="name"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Name</span>}
                rules={[{ required: true, message: "Please input the user's name!" }]}
              >
                <Input
                  placeholder="Enter user's full name"
                  style={{ borderRadius: "6px", padding: "8px 12px" }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Email</span>}
                rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
              >
                <Input
                  placeholder="Enter email address"
                  style={{ borderRadius: "6px", padding: "8px 12px" }}
                />
              </Form.Item>
              <Form.Item
                name="role"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Role</span>}
                rules={[{ required: true, message: "Please select the user's role!" }]}
              >
                <Select style={{ borderRadius: "6px" }}>
                  <Option value="Admin">Admin</Option>
                  <Option value="User">User</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="status"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Status</span>}
                rules={[{ required: true, message: "Please select the user's status!" }]}
              >
                <Select style={{ borderRadius: "6px" }}>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="department"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Department</span>}
              >
                <Input
                  placeholder="Enter department name"
                  style={{ borderRadius: "6px", padding: "8px 12px" }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label={<span style={{ fontWeight: 600, color: "#374151" }}>Phone</span>}
              >
                <Input
                  placeholder="Enter phone number"
                  style={{ borderRadius: "6px", padding: "8px 12px" }}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="bio"
              label={<span style={{ fontWeight: 600, color: "#374151" }}>Bio</span>}
            >
              <textarea
                style={{
                  width: "100%",
                  padding: "12px",
                  minHeight: "100px",
                  resize: "vertical",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                }}
                placeholder="Enter a brief description about the user..."
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "flex-end",
                  paddingTop: 12,
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <Button
                  variant="primary"
                  htmlType="submit"
                  loading={createUserMutation.isPending || updateUserMutation.isPending}
                  style={{
                    background: "#111827",
                    border: "1px solid #111827",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {editingUser ? "Update User" : "Create User"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  style={{
                    borderRadius: "6px",
                    padding: "8px 16px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

      <UsersTable
        users={filteredUsers}
        onOpenDetails={openDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deleting={deleteUserMutation.isPending}
      />

      <UserDetailsDrawer
        user={selectedUser}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
