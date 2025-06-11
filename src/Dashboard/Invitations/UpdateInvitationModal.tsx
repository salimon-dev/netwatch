import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import type { IInvitation } from "../../specs";
import dayjs from "dayjs";
import { updateInvitation } from "../../Rest/invitations";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
  invitation?: IInvitation;
}
export default function UpdateInvitationModal({ onClose, invitation }: Props) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: invitation ? invitation.code : "",
      usage_remaining: invitation ? invitation.usage_remaining : 4,
      expires_at: invitation ? invitation.expires_at : undefined,
      status: invitation ? invitation.status : 1,
    },
    validationSchema: yup.object({
      code: yup.string().max(16),
      usage_remaining: yup.number().min(0),
      expires_at: yup.number().optional(),
      status: yup.number().required(),
    }),
    onSubmit: async (values) => {
      await updateInvitation(invitation!.id, values);
      queryClient.refetchQueries({ queryKey: ["invitations"] });
      onClose();
    },
  });

  return (
    <Modal title="Update permission" open={!!invitation} onCancel={onClose} footer={null} destroyOnHidden>
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
            <Form.Item
              name="expires_at"
              label="Expires at"
              initialValue={formik.values.expires_at ? dayjs(formik.values.expires_at) : undefined}
            >
              <DatePicker
                mode="date"
                style={{ width: "100%" }}
                onChange={(date) => {
                  formik.setFieldValue("expires_at", date.unix());
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
