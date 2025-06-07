import { Button, Col, Modal, Row, Space } from "antd";
import { Form, Formik } from "formik";
import * as yup from "yup";
import UserSearchInput from "../../Components/Form/UserSearchInput";
import NumberInput from "../../Components/Form/NumberInput";
import TextInput from "../../Components/Form/TextInput";
import SelectInput from "../../Components/Form/SelectInput";
import type { ITransaction } from "../../specs";

interface Props {
  onClose: () => void;
  transaction?: ITransaction;
}
export default function UpdateTransactionModal({ onClose, transaction }: Props) {
  return (
    <Modal
      title="Submit new transaction"
      open={!!transaction}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={{
          source_id: "",
          target_id: "",
          amount: 100,
          description: "",
          status: 1,
          category: "general",
        }}
        validationSchema={yup.object({
          source_id: yup.string().required(),
          target_id: yup.string().required(),
          amount: yup.number().min(100).required(),
          description: yup.string().required(),
          status: yup.number().required(),
          category: yup.string().required(),
        })}
        onSubmit={async (values) => {
          console.log(values);
          onClose();
        }}
      >
        {({ dirty, isSubmitting }) => (
          <Form>
            <Row gutter={[12, 12]}>
              <Col xs={24}>
                <UserSearchInput name="source_id" label="Source" />
              </Col>
              <Col xs={24}>
                <UserSearchInput name="target_id" label="Target" />
              </Col>
              <Col xs={24}>
                <NumberInput name="amount" label="Amount" />
              </Col>
              <Col xs={24}>
                <TextInput name="description" label="description" />
              </Col>
              <Col xs={24}>
                <TextInput name="category" label="category" />
              </Col>
              <Col xs={24}>
                <SelectInput
                  name="status"
                  label="Status"
                  options={[
                    { value: 1, label: "pending" },
                    { value: 2, label: "rejected" },
                    { value: 3, label: "accepted" },
                  ]}
                />
              </Col>
              <Col xs={24}>
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="primary" htmlType="submit" disabled={!dirty} loading={isSubmitting}>
                    Submit
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
