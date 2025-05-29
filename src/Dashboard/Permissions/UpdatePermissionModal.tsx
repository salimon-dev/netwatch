import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import type { IPermission } from "../../specs";

interface Props {
  onClose: () => void;
  permission?: IPermission;
}
export default function UpdatePermissionModal({ onClose, permission }: Props) {
  const formik = useFormik({
    initialValues: {
      user_id: permission ? permission.user_id : "",
      permission: permission ? permission.permission : "",
    },
    validationSchema: yup.object({
      user_id: yup.string().required(),
      permission: yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    },
    enableReinitialize: true,
  });

  return (
    <Modal title="Update permission" open={!!permission} onCancel={onClose} footer={null} destroyOnHidden>
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
