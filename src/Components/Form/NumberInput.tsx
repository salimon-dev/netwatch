import { Col, Input, Row, Typography } from "antd";
import { useFormikContext } from "formik";

interface Props {
  name: string;
  label: string;
}
export default function NumberInput({ name, label }: Props) {
  const formik = useFormikContext<{ [key: string]: number }>();
  return (
    <Row gutter={[4, 4]}>
      <Col xs={24}>
        <Typography.Text type={formik.touched[name] && formik.errors[name] ? "danger" : undefined}>
          {label}
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Input
          name={name}
          status={formik.touched[name] && formik.errors[name] ? "error" : undefined}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      </Col>
      <Col xs={24} style={{ minHeight: 22 }}>
        {formik.touched[name] && formik.errors[name] && (
          <Typography.Text type="danger" style={{ fontSize: 12 }}>
            {formik.errors[name]}
          </Typography.Text>
        )}
      </Col>
    </Row>
  );
}
