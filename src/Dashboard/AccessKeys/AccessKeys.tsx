import { Button, Card, Col, Popconfirm, Row, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateAccessKeyModal from "./CreateAccessKeyModal";
import { useQuery } from "@tanstack/react-query";
import { tsToDateString } from "../../helpers";
import { deleteAccessKey, regenerateAccessKey, searchAccessKeys } from "../../Rest/access-keys";
import type { IAccessKey } from "../../specs";
import AccessKeyRegenerateModal from "./AccessKeyRegenerateModal";

const pageSize = 15;
export default function AccessKeys() {
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string>();
  const [regenerated, setRenegrated] = useState<IAccessKey>();
  const [regenerating, setRegenrating] = useState<IAccessKey>();

  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["access-keys", page, pageSize],
    queryFn: async () => {
      return searchAccessKeys({ page, page_size: pageSize });
    },
  });

  function total() {
    if (isLoading || !data) return 0;
    return data.total;
  }
  function dataSource() {
    if (isLoading || !data) return [];
    return data.data.map((item, i) => ({
      key: item.id,
      num: i + 1 + (page - 1) * pageSize,
      username: item.username,
      name: item.name,
      created_at: tsToDateString(item.created_at),
      updated_at: tsToDateString(item.updated_at),
      actions: (
        <Space>
          <Popconfirm
            title="Delete"
            description="Are you sure you want to delete this access key?"
            onConfirm={async () => {
              try {
                setDeleting(item.id);
                await deleteAccessKey(item.id);
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
          <Popconfirm
            title="Regenerate"
            description="Are you sure you want to regenerate this access key?"
            onConfirm={async () => {
              try {
                setRegenrating(item);
                await regenerateAccessKey(item.id);
                setRenegrated(item);
                refetch();
              } catch (err) {
                console.log(err);
              } finally {
                setRegenrating(undefined);
              }
            }}
          >
            <Button shape="circle" type="text" loading={regenerating ? regenerating.id === item.id : false}>
              <ReloadOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    }));
  }
  return (
    <Card
      title="Access Keys"
      extra={
        <Space>
          <Button shape="circle" type="text" onClick={() => setCreating(true)}>
            <PlusOutlined />
          </Button>
        </Space>
      }
    >
      <Row>
        <CreateAccessKeyModal open={creating} onClose={() => setCreating(false)} />
        {regenerated && (
          <AccessKeyRegenerateModal
            accessKey={regenerated}
            onClose={() => {
              setRenegrated(undefined);
            }}
          />
        )}
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "name", dataIndex: "name", title: "name" },
              { key: "username", dataIndex: "username", title: "username" },
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
