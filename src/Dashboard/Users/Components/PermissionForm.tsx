import { Button, Card, Col, Row, Tree, type TreeDataNode } from "antd";
import type { IPermission } from "../../../specs";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../Store/rest";
import { useState } from "react";

const permissionsTree: TreeDataNode[] = [
  {
    title: "users:full",
    key: "users:full",
    children: [
      {
        title: "users:create",
        key: "users:create",
      },
      {
        title: "users:update",
        key: "users:update",
      },
      {
        title: "users:delete",
        key: "users:delete",
      },
      {
        title: "users:get",
        key: "users:get",
      },
      {
        title: "users:search",
        key: "users:search",
      },
    ],
  },
  {
    title: "invitations:full",
    key: "invitations:full",
    children: [
      {
        title: "invitations:create",
        key: "invitations:create",
      },
      {
        title: "invitations:update",
        key: "invitations:update",
      },
      {
        title: "invitations:delete",
        key: "invitations:delete",
      },
      {
        title: "invitations:get",
        key: "invitations:get",
      },
      {
        title: "invitations:search",
        key: "invitations:search",
      },
    ],
  },
  {
    title: "transactions:full",
    key: "transactions:full",
    children: [
      {
        title: "transactions:create",
        key: "transactions:create",
      },
      {
        title: "transactions:update",
        key: "transactions:update",
      },
      {
        title: "transactions:delete",
        key: "transactions:delete",
      },
      {
        title: "transactions:get",
        key: "transactions:get",
      },
      {
        title: "transactions:search",
        key: "transactions:search",
      },
    ],
  },
  {
    title: "permissions:full",
    key: "permissions:full",
    children: [
      {
        title: "permissions:create",
        key: "permissions:create",
      },
      {
        title: "permissions:update",
        key: "permissions:update",
      },
      {
        title: "permissions:delete",
        key: "permissions:delete",
      },
      {
        title: "permissions:get",
        key: "permissions:get",
      },
      {
        title: "permissions:search",
        key: "permissions:search",
      },
    ],
  },
];

interface Props {
  userId: string;
}
export default function PermissionForm({ userId }: Props) {
  const [isModified, setIsModified] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const { isLoading } = useQuery({
    queryKey: ["user", "permissions", userId],
    queryFn: async () => {
      const response = await httpClient
        .get<IPermission[]>(`/admin/permissions/user/${userId}`, {
          params: { page: 1, page_size: 100 },
        })
        .then((response) => response.data);
      setPermissions(response.map((p) => p.permission));
      return response;
    },
  });
  const { mutateAsync: onSave, isPending: isUpdating } = useMutation({
    mutationKey: ["update-permissions", userId],
    mutationFn: async () => {
      const params = {
        permissions,
        userId,
      };
      console.log(params);
      setIsModified(false);
    },
  });

  function onPermissionsChange(keys: string[]) {
    if (permissions.some((key) => key === "keymaker")) setPermissions([...keys, "keymaker"]);
    else setPermissions(keys);
    setIsModified(true);
  }

  return (
    <Card
      title="Permissions"
      loading={isLoading}
      extra={
        <Button htmlType="submit" loading={isUpdating} disabled={!isModified} onClick={() => onSave()}>
          <SaveOutlined />
        </Button>
      }
    >
      <Row gutter={[12, 24]}>
        <Col xs={24}>
          <Tree
            checkable
            treeData={permissionsTree}
            selectedKeys={permissions}
            onCheck={(value) => {
              onPermissionsChange(value as string[]);
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}
