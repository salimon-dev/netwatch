import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateTransactionModal from "./CreateTransactionModal";
import type { ITransaction } from "../../specs";
import UpdateTransactionModal from "./UpdateTransactionModal";
import { useQuery } from "@tanstack/react-query";
import { searchTransactions } from "../../Rest/transactions";
import { dateStringToHuman } from "../../time";

const pageSize = 25;
export default function Transactions() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<ITransaction>();

  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", page],
    queryFn: async () => {
      const response = await searchTransactions({ page, page_size: pageSize });
      return response;
    },
  });

  function dataSource() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, index) => {
      return {
        key: item.id,
        num: (page - 1) * pageSize + index + 1,
        source: item.source_id,
        target: item.target_id,
        category: item.category,
        amount: `${item.amount} (${item.fee} fee)`,
        created_at: dateStringToHuman(item.created_at),
        updated_at: dateStringToHuman(item.updated_at),
        actions: (
          <Space>
            <Button shape="circle" type="text">
              <EditOutlined />
            </Button>
            <Button shape="circle" type="text">
              <DeleteOutlined />
            </Button>
          </Space>
        ),
      };
    });
  }
  function total() {
    if (isLoading) return 0;
    if (!data) return 0;
    return data.total;
  }
  return (
    <Card
      title="Transactions"
      extra={
        <Space>
          <Button shape="circle" type="text" onClick={() => setCreating(true)}>
            <PlusOutlined />
          </Button>
        </Space>
      }
    >
      <Row>
        <CreateTransactionModal open={creating} onClose={() => setCreating(false)} />
        <UpdateTransactionModal onClose={() => setUpdating(undefined)} transaction={updating} />
        <Col xs={24}>
          <Table
            loading={isLoading}
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "source", dataIndex: "source", title: "source" },
              { key: "target", dataIndex: "target", title: "target" },
              { key: "amount", dataIndex: "amount", title: "amount" },
              { key: "category", dataIndex: "category", title: "category" },
              { key: "created_at", dataIndex: "created_at", title: "created at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "" },
            ]}
            dataSource={dataSource()}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: total(),
              onChange: (current) => {
                setPage(current);
              },
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}
