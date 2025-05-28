import { Form, Input } from "antd";
import { useFormikContext } from "formik";

interface Props {
  name: string;
  label: string;
}
export default function PasswordInput({ name, label }: Props) {
  const formik = useFormikContext<{ [key: string]: string }>();
  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={formik.values[name]}
      help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : undefined}
    >
      <Input.Password onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values[name]} />
    </Form.Item>
  );
}
