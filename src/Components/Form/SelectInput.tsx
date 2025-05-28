import { Form, Select } from "antd";
import { useFormikContext } from "formik";

interface Props {
  name: string;
  label: string;
  options: { value: string | number | boolean; label: string }[];
}
export default function SelectInput({ name, label, options }: Props) {
  const formik = useFormikContext<{ [key: string]: string }>();
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={formik.values[name]}
      help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : undefined}
    >
      <Select
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        options={options}
      />
    </Form.Item>
  );
}
