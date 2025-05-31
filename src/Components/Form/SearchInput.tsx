import { Col, Row, Select, Typography } from "antd";
import { useFormikContext } from "formik";
import { useRef } from "react";

interface Props {
  name: string;
  label: string;
  loading: boolean;
  onSearch: (value: string) => Promise<void>;
  options: { value: string; label: string }[];
}
export default function SearchInput({ name, label, loading, onSearch, options }: Props) {
  const debounce = useRef<number>(null);
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
          value={formik.values[name]}
          showSearch
          onSearch={(value) => {
            if (debounce.current) {
              clearTimeout(debounce.current);
            }
            debounce.current = setTimeout(() => {
              onSearch(value);
            }, 250);
          }}
          onChange={(val) => formik.setFieldValue(name, val)}
          filterOption={false}
          options={options}
          defaultActiveFirstOption={false}
          loading={loading}
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
