import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";

export default function CreateUser() {
  const formik = useFormik({
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      description: yup.string().required(),
      status: yup.number().required(),
      privacy: yup.number().required(),
      credit: yup.number().required(),
      score: yup.number().required(),
      permissions: yup.array(yup.number().required()).required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
    initialValues: {
      username: "",
      password: "",
      description: "",
      status: 1,
      privacy: 2,
      credit: 0,
      score: 0,
      permissions: [],
    },
  });
  return (
    <Card title="Create User">
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={12}>
          <Col xs={24} md={12}>
            <Form.Item name="username" label="Username">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="password" label="Password">
              <Input.Password onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="description" label="Description">
              <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="status" label="Status">
              <Select
                options={[
                  { value: 1, label: "active" },
                  { value: 2, label: "inactive" },
                ]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="privacy" label="Privacy">
              <Select
                options={[
                  { value: 1, label: "public" },
                  { value: 2, label: "private" },
                ]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="credit" label="Credit">
              <Input type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="score" label="Score">
              <Input type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="permissions" label="Permissions">
              <Select
                mode="multiple"
                options={[
                  { value: 1, label: "users full management" },
                  { value: 2, label: "invitations full management" },
                  { value: 3, label: "transactions full management" },
                  { value: 4, label: "permi full management" },
                ]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Space>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
