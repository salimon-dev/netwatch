import { Button, Card, Col, Row, Space, Table, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateTransactionModal from "./Components/CreateTransactionModal";
import { TransactionStatusPending, type ITransaction } from "../../specs";
import { useQuery } from "@tanstack/react-query";
import { deleteTransaction, searchTransactions, updateTransactionStatus } from "../../Rest/transactions";
import { shortenNumber, tsToDateString } from "../../helpers";
import ConfirmModal from "../../Components/ConfirmDialog";
import TransactionStatus from "./Components/TransactionStatus";

const pageSize = 25;
export default function Transactions() {
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<ITransaction>();

  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["transactions", page],
    queryFn: async () => {
      const response = await searchTransactions({ page, page_size: pageSize });
      return response;
    },
  });

  const [submitting, setSubmitting] = useState<string>();
  async function submitTransaction(id: string, status: "accept" | "reject") {
    setSubmitting(id);
    try {
      await updateTransactionStatus(id, status);
      refetch();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(undefined);
    }
  }

  function dataSource() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, index) => {
      return {
        key: item.id,
        num: (page - 1) * pageSize + index + 1,
        source: <Tooltip title={item.source_id}>{item.source_username}</Tooltip>,
        target: <Tooltip title={item.target_id}>{item.target_username}</Tooltip>,
        category: item.category,
        amount: `${shortenNumber(item.amount)} (${shortenNumber(item.fee)} fee)`,
        status: <TransactionStatus transaction={item} />,
        created_at: tsToDateString(item.created_at),
        updated_at: tsToDateString(item.updated_at),
        actions: (
          <Space>
            {item.status === TransactionStatusPending && (
              <Button
                shape="circle"
                type="text"
                onClick={() => submitTransaction(item.id, "accept")}
                loading={submitting === item.id}
              >
                <CheckOutlined />
              </Button>
            )}
            {item.status === TransactionStatusPending && (
              <Button
                shape="circle"
                type="text"
                onClick={() => submitTransaction(item.id, "reject")}
                loading={submitting === item.id}
              >
                <CloseOutlined />
              </Button>
            )}
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
        <ConfirmModal
          open={!!deleting}
          description={`Are you sure you want to delete this transaction?`}
          title="Delete transaction"
          onCancel={() => setDeleting(undefined)}
          onConfirm={async () => {
            try {
              await deleteTransaction(deleting!.id);
            } catch (err) {
              console.log(err);
            } finally {
              setDeleting(undefined);
            }
          }}
        />
        <Col xs={24}>
          <Table
            loading={isLoading}
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "source", dataIndex: "source", title: "source" },
              { key: "target", dataIndex: "target", title: "target" },
              { key: "amount", dataIndex: "amount", title: "amount" },
              { key: "category", dataIndex: "category", title: "category" },
              { key: "status", dataIndex: "status", title: "status" },
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
