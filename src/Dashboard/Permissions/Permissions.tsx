import { Button, Card, Col, Popconfirm, Row, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePermissionModal from "./CreatePermissionModal";
import type { IPermission } from "../../specs";
import UpdatePermissionModal from "./UpdatePermissionModal";
import { useQuery } from "@tanstack/react-query";
import { deletePermission, searchPermissions } from "../../Rest/permissions";
import { tsToDateString } from "../../helpers";

const pageSize = 15;
export default function Permissions() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<IPermission>();
  const [deleting, setDeleting] = useState<string>();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["permissions", page, pageSize],
    queryFn: async () => {
      return searchPermissions({ page, page_size: pageSize });
    },
  });

  function total() {
    if (isLoading || !data) return 0;
    return data.total;
  }
  function dataSource() {
    if (isLoading || !data) return [];
    return data.data.map((item, i) => ({
      num: i + 1 + (page - 1) * pageSize,
      username: item.username,
      permission: item.permission,
      created_at: tsToDateString(item.created_at),
      updated_at: tsToDateString(item.updated_at),
      actions: (
        <Space>
          <Popconfirm
            title="Delete"
            description="Are you sure you want to delete this permission?"
            onConfirm={async () => {
              try {
                setDeleting(item.id);
                await deletePermission(item.id);
                refetch();
              } catch (err) {
                console.log(err);
              } finally {
                setDeleting(undefined);
              }
            }}
          >
            <Button shape="circle" type="text" loading={deleting === item.id}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    }));
  }
  return (
    <Card
      title="Permissions"
      extra={
        <Space>
          <Button shape="circle" type="text" onClick={() => setCreating(true)}>
            <PlusOutlined />
          </Button>
        </Space>
      }
    >
      <Row>
        <CreatePermissionModal open={creating} onClose={() => setCreating(false)} />
        <UpdatePermissionModal onClose={() => setUpdating(undefined)} permission={updating} />
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "username", dataIndex: "username", title: "username" },
              { key: "permission", dataIndex: "permission", title: "permission", width: 220 },
              { key: "created_at", dataIndex: "created_at", title: "created at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "", width: 80 },
            ]}
            loading={isLoading}
            dataSource={dataSource()}
            pagination={{
              current: page,
              pageSize,
              onChange: (page) => setPage(page),
              total: total(),
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}
