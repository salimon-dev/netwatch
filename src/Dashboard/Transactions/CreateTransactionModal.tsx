import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreateTransactionModal({ onClose, open }: Props) {
  const formik = useFormik({
    initialValues: {
      source_id: "",
      target_id: "",
      amount: 100,
      description: "",
      status: 1,
      category: "general",
    },
    validationSchema: yup.object({
      source_id: yup.string().required(),
      target_id: yup.string().required(),
      amount: yup.number().min(100).required(),
      description: yup.string().required(),
      status: yup.number().required(),
      category: yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    },
  });
  return (
    <Modal title="Submit new transaction" open={open} onCancel={onClose} footer={null} destroyOnHidden>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="source_id" label="Source" initialValue={formik.values.source_id}>
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="target_id" label="Target">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="amount" label="Amount">
              <Input type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="status" label="Status">
              <Select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                  { value: 1, label: "pending" },
                  { value: 2, label: "rejected" },
                  { value: 3, label: "accepted" },
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
