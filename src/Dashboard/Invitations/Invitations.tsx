import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateInvitationModal from "./CreateInvitationModal";
import type { IInvitation } from "../../specs";
import UpdatePermissionModal from "./UpdateInvitationModal";

export default function Invitations() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<IInvitation>();
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
        <CreateInvitationModal open={creating} onClose={() => setCreating(false)} />
        <UpdatePermissionModal onClose={() => setUpdating(undefined)} invitation={updating} />
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "created_by", dataIndex: "created_by", title: "created by" },
              { key: "remaining_usage", dataIndex: "remaining_usage", title: "remaining usage" },
              { key: "expires_at", dataIndex: "expires_at", title: "expires at", width: 160 },
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
  invitation: IInvitation;
}
function Actions({ invitation }: ActionsProps) {
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
