import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import type { ITransaction } from "../../specs";

interface Props {
  onClose: () => void;
  transaction?: ITransaction;
}
export default function UpdateTransactionModal({ onClose, transaction }: Props) {
  const formik = useFormik({
    initialValues: {
      user_id: transaction ? transaction.user_id : "",
      transaction: transaction ? transaction.transaction : "",
    },
    validationSchema: yup.object({
      user_id: yup.string().required(),
      transaction: yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      onClose();
    },
    enableReinitialize: true,
  });

  return (
    <Modal title="Update transaction" open={!!transaction} onCancel={onClose} footer={null} destroyOnHidden>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item name="user_id" label="User">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="transaction" label="Transaction">
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
