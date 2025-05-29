import { Button, Card, Col, Row, Tree } from "antd";
import type { IPermission } from "../../../specs";
import { SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../Store/rest";
import { useState } from "react";
import { permissionsTree } from "../../../Helpers/permissions";

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
