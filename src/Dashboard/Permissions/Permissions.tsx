import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreatePermissionModal from "./CreatePermissionModal";
import type { IPermission } from "../../specs";
import UpdatePermissionModal from "./UpdatePermissionModal";

export default function Permissions() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<IPermission>();
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
              { key: "permission", dataIndex: "permission", title: "permission" },
              { key: "created_at", dataIndex: "created_at", title: "created at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "" },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}

interface ActionsProps {
  permission: IPermission;
}
function Actions({ permission }: ActionsProps) {
  return (
    <Space>
      <Button shape="circle" type="text">
        <EditOutlined />
      </Button>
      <Button shape="circle" type="text">
        <DeleteOutlined />
      </Button>
    </Space>
  );
}
