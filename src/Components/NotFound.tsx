import { Col, Result, Row } from "antd";

interface Props {
  title?: string;
  description?: string;
}
export default function NotFound({ title, description }: Props) {
  return (
    <Row>
      <Col xs={24}>
        <Result
          status="404"
          title={title || "not found"}
          subTitle={description || "requested record not found"}
        />
      </Col>
    </Row>
  );
}
