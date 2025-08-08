"use client";

import { Card } from "@prajwolpakka/antd-extended";
import { Button as AntdButton, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { User } from "@/lib/data/users";

export type UsersTableProps = {
  users: User[];
  onOpenDetails: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  deleting: boolean;
};

export function UsersTable({ users, onOpenDetails, onEdit, onDelete, deleting }: UsersTableProps) {
  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span style={{ color: "#374151", fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span style={{ color: "#374151" }}>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color={role === "Admin" ? "blue" : "default"}>{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text: string) => <span style={{ color: "#374151" }}>{text}</span>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (
        <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="small">
          <AntdButton type="text" size="small" onClick={() => onOpenDetails(record)}>
            Details
          </AntdButton>
          <AntdButton
            type="text"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(record);
            }}
          >
            Edit
          </AntdButton>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={(e) => {
              e?.stopPropagation?.();
              onDelete(record.id);
            }}
          >
            <AntdButton
              type="text"
              size="small"
              danger
              loading={deleting}
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </AntdButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: 6,
        boxShadow: "none",
        border: "1px solid #e5e7eb",
        background: "#fff",
        padding: 0,
      }}
    >
      <div style={{ padding: 16 }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          locale={{
            emptyText: (
              <div style={{ color: "#64748b", padding: 16 }}>
                No users match your filters. Try adjusting search or filters.
              </div>
            ),
          }}
          onRow={(record) => ({
            onDoubleClick: () => onOpenDetails(record as User),
          })}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
            position: ["bottomCenter"],
            style: { marginTop: 24 },
          }}
          scroll={{ x: true }}
          bordered={false}
          size="middle"
          style={{ boxShadow: "none", borderRadius: "8px", overflow: "hidden" }}
        />
      </div>
    </Card>
  );
}


