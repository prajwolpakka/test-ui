"use client";

import { Descriptions, Drawer, Tag, Typography } from "antd";
import type { User } from "@/lib/data/users";

const { Text } = Typography;

export type UserDetailsDrawerProps = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

export function UserDetailsDrawer({ user, open, onClose }: UserDetailsDrawerProps) {
  return (
    <Drawer
      title="User Details"
      open={open}
      onClose={onClose}
      width={520}
      styles={{ header: { borderBottom: "1px solid #e5e7eb" }, body: { paddingBottom: 24 } }}
    >
      {user ? (
        <Descriptions
          bordered
          size="middle"
          column={1}
          labelStyle={{ width: 140 }}
          items={[
            { key: "name", label: "Name", children: user.name },
            { key: "email", label: "Email", children: user.email },
            {
              key: "role",
              label: "Role",
              children: <Tag color={user.role === "Admin" ? "blue" : "default"}>{user.role}</Tag>,
            },
            {
              key: "status",
              label: "Status",
              children: <Tag color={user.status === "Active" ? "green" : "red"}>{user.status}</Tag>,
            },
            { key: "department", label: "Department", children: user.department },
            { key: "phone", label: "Phone", children: user.phone || "-" },
            { key: "created", label: "Created At", children: user.createdAt },
            {
              key: "lastLogin",
              label: "Last Login",
              children: new Date(user.lastLogin).toLocaleString(),
            },
            {
              key: "bio",
              label: "Bio",
              children: <Text style={{ whiteSpace: "pre-wrap" }}>{user.bio || "-"}</Text>,
            },
          ]}
        />
      ) : null}
    </Drawer>
  );
}


