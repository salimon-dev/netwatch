import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { createAccessKey } from "../../Rest/access-keys";
import UserSearchInput from "../../Components/Form/UserSearchInput";
import TextInput from "../../Components/Form/TextInput";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function CreateAccessKeyModal({ onClose, open }: Props) {
  const queryClient = useQueryClient();
  const [accessKey, setAccessKey] = useState<string>();
  return (
    <Modal title="Create new access key" open={open} onCancel={onClose} footer={null} destroyOnHidden>
      <Formik
        initialValues={{
          name: "",
          user_id: "",
        }}
        validationSchema={yup.object({
          user_id: yup.string().required(),
          name: yup.string().required(),
        })}
        onSubmit={async (values) => {
          const result = await createAccessKey(values);
          queryClient.refetchQueries({ queryKey: ["transactions"] });
          setAccessKey(result.value);
        }}
      >
        {({ dirty, isSubmitting }) => (
          <Form>
            <Row gutter={[12, 12]}>
              <Col xs={24}>
                <UserSearchInput name="user_id" label="User" />
              </Col>
              <Col xs={24}>
                <TextInput name="name" label="name" />
              </Col>
              {accessKey && (
                <Col xs={24}>
                  <Typography.Text>access key created: </Typography.Text>
                  <Typography.Text code copyable>
                    {accessKey}
                  </Typography.Text>
                </Col>
              )}
              <Col xs={24}>
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="primary" htmlType="submit" disabled={!dirty} loading={isSubmitting}>
                    {accessKey ? "OK" : "Submit"}
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
