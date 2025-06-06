import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateTransactionModal from "./CreateTransactionModal";
import type { ITransaction } from "../../specs";
import UpdateTransactionModal from "./UpdateTransactionModal";

export default function Transactions() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState<ITransaction>();
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
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "username", dataIndex: "username", title: "username" },
              { key: "transaction", dataIndex: "transaction", title: "transaction" },
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
  transaction: ITransaction;
}
function Actions({ transaction }: ActionsProps) {
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
