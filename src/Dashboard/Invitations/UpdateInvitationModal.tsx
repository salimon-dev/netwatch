import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import type { IInvitation } from "../../specs";

interface Props {
  onClose: () => void;
  invitation?: IInvitation;
}
export default function UpdateInvitationModal({ onClose, invitation }: Props) {
  const formik = useFormik({
    initialValues: {
      code: invitation ? invitation.code : "",
      usage_remaining: invitation ? invitation.usage_remaining : 4,
      expires_at: invitation ? invitation.expires_at : "",
      status: invitation ? invitation.status : 1,
    },
    validationSchema: yup.object({
      code: yup.string().max(16),
      usage_remaining: yup.number().min(0),
      expires_at: yup.date().required(),
      status: yup.number().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    },
  });

  return (
    <Modal title="Update permission" open={!!invitation} onCancel={onClose} footer={null} destroyOnHidden>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="code" label="Code">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="usage_remaining" label="Usage remaining">
              <Input type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="status" label="Status">
              <Select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                  { value: 1, label: "active" },
                  { value: 2, label: "inactive" },
                ]}
              />
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
