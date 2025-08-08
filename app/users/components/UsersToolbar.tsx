"use client";

import { Button, Card } from "@prajwolpakka/antd-extended";
import { Button as AntdButton, Input, Select } from "antd";

const { Option } = Select;

export type UsersToolbarProps = {
  search: string;
  setSearch: (val: string) => void;
  roleFilter: string | null;
  setRoleFilter: (val: string | null) => void;
  statusFilter: string | null;
  setStatusFilter: (val: string | null) => void;
  onAddUser: () => void;
  onClear: () => void;
};

export function UsersToolbar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onAddUser,
  onClear,
}: UsersToolbarProps) {
  return (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 6,
        boxShadow: "none",
        border: "1px solid #e5e7eb",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Input
          placeholder="Search users by name, email, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          style={{ width: 320 }}
          allowClear
        />
        <Select
          style={{ width: 160 }}
          placeholder="Role"
          value={roleFilter}
          onChange={(value) => setRoleFilter(value)}
          allowClear
          size="large"
        >
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
        </Select>
        <Select
          style={{ width: 160 }}
          placeholder="Status"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          allowClear
          size="large"
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
        <AntdButton
          type="text"
          onClick={onClear}
          aria-label="Clear filters"
          style={{ height: 40, padding: "0 12px", display: "inline-flex", alignItems: "center" }}
        >
          Clear
        </AntdButton>
        <div style={{ marginLeft: "auto" }}>
          <Button
            variant="primary"
            size="large"
            onClick={onAddUser}
            style={{
              height: 40,
              display: "inline-flex",
              alignItems: "center",
              background: "#111827",
              border: "1px solid #111827",
              color: "#fff",
            }}
          >
            Add User
          </Button>
        </div>
      </div>
    </Card>
  );
}


