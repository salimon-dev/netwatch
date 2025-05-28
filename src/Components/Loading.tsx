import { Col, Row, Spin } from "antd";

interface Props {
  description?: string;
}
export default function Loading({ description }: Props) {
  return (
    <Row style={{ textAlign: "center" }} gutter={[0, 24]}>
      <Col xs={24} style={{ marginTop: 50 }}>
        <Spin size="large" />
      </Col>
      <Col xs={24}>{description}</Col>
    </Row>
  );
}
