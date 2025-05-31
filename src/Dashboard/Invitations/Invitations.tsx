import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateInvitationModal from "./CreateInvitationModal";
import type { IInvitation } from "../../specs";
import UpdatePermissionModal from "./UpdateInvitationModal";
import { useQuery } from "@tanstack/react-query";
import { searchInvitations } from "../../Rest/invitations";
import { dateStringToHuman } from "../../time";

const page_size = 15;
export default function Invitations() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<IInvitation>();

  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery({
    queryKey: ["invitations", page, page_size],
    queryFn: async () => {
      return searchInvitations({ page, page_size });
    },
  });

  function dataSource() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, i) => ({
      key: item.id,
      num: (page - 1) * page_size + i + 1,
      created_by: item.created_by_username,
      usage_remaining: item.usage_remaining,
      code: item.code,
      expires_at: dateStringToHuman(item.expires_at),
      created_at: dateStringToHuman(item.created_at),
      updated_at: dateStringToHuman(item.updated_at),
      actions: (
        <Actions
          setEditing={() => setUpdating(item)}
          setDeleting={() => {
            console.log("delete");
          }}
        />
      ),
    }));
  }
  function total() {
    if (isLoading) return 0;
    if (!data) return 0;
    return data.total;
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
        <CreateInvitationModal open={creating} onClose={() => setCreating(false)} />
        <UpdatePermissionModal onClose={() => setUpdating(undefined)} invitation={updating} />
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "code", dataIndex: "code", title: "code" },
              { key: "created_by", dataIndex: "created_by", title: "created by" },
              {
                key: "usage_remaining",
                dataIndex: "usage_remaining",
                title: "count",
                ellipsis: true,
                width: 80,
              },
              { key: "expires_at", dataIndex: "expires_at", title: "expires at", width: 160 },
              { key: "created_at", dataIndex: "created_at", title: "created at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "", width: 120 },
            ]}
            dataSource={dataSource()}
            pagination={{
              current: page,
              pageSize: page_size,
              onChange: setPage,
              total: total(),
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}

interface ActionsProps {
  setEditing: () => void;
  setDeleting: () => void;
}
function Actions({ setEditing, setDeleting }: ActionsProps) {
  return (
    <Space>
      <Button shape="circle" type="text" onClick={() => setEditing()}>
        <EditOutlined />
      </Button>
      <Button shape="circle" type="text" onClick={() => setDeleting()}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
}
