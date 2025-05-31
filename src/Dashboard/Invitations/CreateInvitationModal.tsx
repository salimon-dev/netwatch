import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { createInvitation } from "../../Rest/invitations";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreateInvitationModal({ onClose, open }: Props) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      code: "",
      usage_remaining: 4,
      expires_at: undefined,
      status: 1,
    },
    validationSchema: yup.object({
      code: yup.string().max(16),
      usage_remaining: yup.number().min(0),
      expires_at: yup.string().optional(),
      status: yup.number().required(),
    }),
    onSubmit: async (values) => {
      await createInvitation(values);
      await queryClient.refetchQueries({ queryKey: ["invitations"] });
      close();
    },
  });

  function close() {
    formik.resetForm();
    onClose();
  }
  return (
    <Modal title="Give new permission" open={open} onCancel={close} footer={null} destroyOnHidden>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="code" label="Code" initialValue={formik.values.code}>
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.code} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="usage_remaining"
              label="Usage remaining"
              initialValue={formik.values.usage_remaining}
            >
              <Input
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usage_remaining}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="expires_at" label="Expires at">
              <DatePicker
                mode="date"
                style={{ width: "100%" }}
                onChange={(date) => {
                  formik.setFieldValue("expires_at", date.format("YYYY/MM/DD HH:mm"));
                }}
                showTime
                showSecond={false}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="status" label="Status" initialValue={formik.values.status}>
              <Select
                onChange={(value) => formik.setFieldValue("status", value)}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                options={[
                  { value: 1, label: "active" },
                  { value: 2, label: "inactive" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Space>
              <Button onClick={close}>Cancel</Button>
              <Button type="primary" loading={formik.isSubmitting} htmlType="submit">
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
