import { Button, Card, Col, Row, Space, Table } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { httpClient } from "../../Store/rest";
import type { ICollection, IUser } from "../../specs";
import { dateStringToHuman } from "../../time";

const pageSize = 15;
export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const result = httpClient
        .get<ICollection<IUser>>("/admin/users/search", { params: { page, pageSize } })
        .then((response) => response.data);
      return result;
    },
  });

  function tableData() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data.map((item, i) => {
      return {
        key: item.id,
        num: (page - 1) * pageSize + i + 1,
        username: item.username,
        credit: item.credit,
        score: item.score,
        is_public: item.is_public ? "yes" : "no",
        registered_at: dateStringToHuman(item.registered_at),
        updated_at: dateStringToHuman(item.updated_at),
        actions: (
          <Space>
            <Button
              shape="circle"
              type="text"
              onClick={() => {
                navigate(`/users/${item.id}`);
              }}
            >
              <EditOutlined />
            </Button>
          </Space>
        ),
      };
    });
  }
  return (
    <Card
      title="Users"
      extra={
        <Space>
          <Button
            shape="circle"
            type="text"
            onClick={() => {
              navigate("/users/create");
            }}
          >
            <PlusOutlined />
          </Button>
        </Space>
      }
    >
      <Row gutter={2}>
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "username", dataIndex: "username", title: "username" },
              { key: "credit", dataIndex: "credit", title: "credit", width: 100 },
              { key: "score", dataIndex: "score", title: "score", width: 100 },
              { key: "is_public", dataIndex: "is_public", title: "is public", width: 100 },
              { key: "registered_at", dataIndex: "registered_at", title: "registered at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "" },
            ]}
            dataSource={tableData()}
            loading={isLoading}
            pagination={{
              pageSize: 15,
              current: page,
              onChange: setPage,
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}
