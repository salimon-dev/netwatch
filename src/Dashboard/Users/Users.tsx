import { Button, Card, Col, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { userVisibilityString, type IUser } from "../../specs";
import { shortenNumber, tsToDateString } from "../../helpers";
import ConfirmModal from "../../Components/ConfirmDialog";
import { deleteUser, searchUsers } from "../../Rest/users";
import { useNotification } from "../../Store/Hooks";
import UserStatus from "./Components/UserStatus";

const pageSize = 15;
export default function Users() {
  const [deleting, setDeleting] = useState<IUser>();
  const notification = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const result = searchUsers({ page, page_size: pageSize }).then((response) => response.data);
      return result;
    },
  });

  function tableData() {
    if (isLoading) return [];
    if (!data) return [];
    return data.map((item, i) => {
      return {
        key: item.id,
        num: (page - 1) * pageSize + i + 1,
        username: item.username,
        credit: shortenNumber(item.credit),
        score: shortenNumber(item.score),
        status: <UserStatus user={item} />,
        visiblity: userVisibilityString(item.visibility),
        registered_at: tsToDateString(item.registered_at),
        updated_at: tsToDateString(item.updated_at),
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
            <Button type="text" shape="circle" onClick={() => setDeleting(item)}>
              <DeleteOutlined />
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
      <ConfirmModal
        open={!!deleting}
        title="Delete User"
        description={`Are you sure want to delete user ${deleting?.username}?`}
        onCancel={() => {
          setDeleting(undefined);
        }}
        onConfirm={async () => {
          if (!deleting) return;
          await deleteUser(deleting.id);
          setDeleting(undefined);
          notification.success({ message: "Deleted!", description: "User deleted successfully!" });
          queryClient.refetchQueries({ queryKey: ["users"] });
        }}
      />
      <Row gutter={2}>
        <Col xs={24}>
          <Table
            columns={[
              { key: "num", dataIndex: "num", title: "#", width: 60 },
              { key: "username", dataIndex: "username", title: "username" },
              { key: "status", dataIndex: "status", title: "status", width: 100 },
              { key: "credit", dataIndex: "credit", title: "credit", width: 100 },
              { key: "score", dataIndex: "score", title: "score", width: 100 },
              { key: "visiblity", dataIndex: "visiblity", title: "is public", width: 100 },
              { key: "registered_at", dataIndex: "registered_at", title: "registered at", width: 160 },
              { key: "updated_at", dataIndex: "updated_at", title: "updated at", width: 160 },
              { key: "actions", dataIndex: "actions", title: "", width: 80 },
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
