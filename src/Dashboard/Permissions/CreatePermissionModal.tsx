import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreatePermissionModal({ onClose, open }: Props) {
  const formik = useFormik({
    initialValues: {
      user_id: "",
      permissions: [],
    },
    validationSchema: yup.object({
      user_id: yup.string().required(),
      permissions: yup.array(yup.string().required()).required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    },
  });
  return (
    <Modal title="Give new permission" open={open} onCancel={onClose} footer={null} destroyOnHidden>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="user_id" label="User">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="permission" label="Permission">
              <Select onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
