import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import UserDetailsCard from "./Components/UserDetailsCard/UserDetailsCard";
import PermissionForm from "./Components/PermissionForm";

export default function EditUser() {
  const { id } = useParams() as { id: string };
  return (
    <Row gutter={[12, 12]}>
      <Col xs={24}>
        <UserDetailsCard userId={id} />
      </Col>
      <Col xs={24}>
        <PermissionForm userId={id} />
      </Col>
    </Row>
  );
}
