import { Col, Row, Select, Typography } from "antd";
import { useFormikContext } from "formik";

interface Props {
  name: string;
  label: string;
  options: { value: string | boolean | number; label: string }[];
}
export default function SelectInput({ name, label, options }: Props) {
  const formik = useFormikContext<{ [key: string]: string | number | boolean }>();
  return (
    <Row gutter={[4, 4]}>
      <Col xs={24}>
        <Typography.Text type={formik.touched[name] && formik.errors[name] ? "danger" : undefined}>
          {label}
        </Typography.Text>
      </Col>
      <Col xs={24}>
        <Select
          style={{ width: "100%" }}
          status={formik.touched[name] && formik.errors[name] ? "error" : undefined}
          onChange={(val) => formik.setFieldValue(name, val)}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          options={options}
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
