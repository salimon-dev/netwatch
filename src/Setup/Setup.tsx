import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import * as yup from "yup";
import LogoIcon from "../Icons/LogoIcon";
import { useFormik } from "formik";

export default function Setup() {
  const formik = useFormik({
    validationSchema: yup.object({ username: yup.string().required(), password: yup.string().required() }),
    initialValues: { network: "https://salimon.net/nexus", username: "", password: "" },
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });
  return (
    <Row style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Col xs={22} md={12} lg={8}>
        <Row gutter={4}>
          <Col xs={24} style={{ textAlign: "center" }}>
            <LogoIcon style={{ width: 128 }} />
          </Col>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Typography.Title level={3}>Salimon - NetWatch</Typography.Title>
          </Col>
          <Col xs={24} style={{ marginTop: 28 }}>
            <Card title="Setup">
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Row gutter={2}>
                  <Col xs={24}>
                    <Form.Item
                      name="network"
                      label="Network"
                      initialValue={formik.values.network}
                      help={
                        formik.errors.network && formik.touched.network ? formik.errors.network : undefined
                      }
                      validateStatus={formik.errors.network && formik.touched.network ? "error" : undefined}
                    >
                      <Select
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={[
                          { value: "https://salimon.net/nexus", label: "Official Network" },
                          { value: "https://dev.salimon.net", label: "Development Network" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="username"
                      label="Username"
                      initialValue={formik.values.username}
                      help={
                        formik.errors.username && formik.touched.username ? formik.errors.username : undefined
                      }
                      validateStatus={formik.errors.username && formik.touched.username ? "error" : undefined}
                    >
                      <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="password"
                      label="Password"
                      initialValue={formik.values.password}
                      help={
                        formik.errors.password && formik.touched.password ? formik.errors.password : undefined
                      }
                      validateStatus={formik.errors.password && formik.touched.password ? "error" : undefined}
                    >
                      <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Button type="primary" htmlType="submit" loading={formik.isSubmitting}>
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
