import { Alert, Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import * as yup from "yup";
import LogoIcon from "../Icons/LogoIcon";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import type { IAuthResponse } from "../specs";
import { storeAuthResponse } from "../Store/auth";
import { useState } from "react";
import { setupHttpClient } from "../Store/rest";

export default function Login() {
  const [error, setError] = useState<string>();
  const formik = useFormik({
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      network: yup.string().required(),
      nexus: yup.string(),
    }),
    initialValues: {
      network: "official",
      username: "",
      password: "",
      nexus: "https://salimon.net/nexus",
    },
    onSubmit: async (values) => {
      setError(undefined);
      try {
        const response = await axios
          .post<IAuthResponse>(
            "/auth/login",
            { username: values.username, password: values.password },
            { baseURL: values.nexus }
          )
          .then((response) => response.data);

        response.nexus = values.nexus;
        storeAuthResponse(response);
        setupHttpClient();
      } catch (err) {
        const error = err as AxiosError;
        if (!error.response) {
          setError("connection to nexus service failed");
        } else {
          if (error.response.status == 401) {
            setError("invalid credentials");
          } else {
            setError(error.message);
          }
        }
      }
    },
  });
  return (
    <Row style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Col xs={22} md={16} lg={10} xl={8}>
        <Row gutter={4}>
          <Col xs={24} style={{ textAlign: "center" }}>
            <LogoIcon style={{ width: 128 }} />
          </Col>
          <Col xs={24} style={{ textAlign: "center" }}>
            <Typography.Title level={3}>Salimon - NetWatch</Typography.Title>
          </Col>
          <Col xs={24} style={{ marginTop: 28 }}>
            <Card title="Login">
              <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Row>
                  {error && (
                    <Col xs={24} style={{ marginBottom: 12 }}>
                      <Alert message={error} type="error" />
                    </Col>
                  )}
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
                        onChange={(value) => {
                          formik.setFieldValue("network", value);
                          switch (value) {
                            case "official":
                              formik.setFieldValue("nexus", "https://api.salimon.net/nexus");
                              break;
                            case "development":
                              formik.setFieldValue("nexus", "https://dev-api.salimon.net/nexus");
                              break;
                            default:
                              formik.setFieldValue("nexus", "");
                          }
                        }}
                        onBlur={formik.handleBlur}
                        options={[
                          { value: "official", label: "Official Network" },
                          { value: "development", label: "Development Network" },
                          { value: "custom", label: "Custom Network" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  {formik.values.network === "custom" && (
                    <Col xs={24}>
                      <Form.Item
                        name="nexus"
                        label="Nexus Address"
                        initialValue={formik.values.nexus}
                        help={formik.errors.nexus && formik.touched.nexus ? formik.errors.nexus : undefined}
                        validateStatus={formik.errors.nexus && formik.touched.nexus ? "error" : undefined}
                      >
                        <Input onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      </Form.Item>
                    </Col>
                  )}
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
                      <Input.Password onChange={formik.handleChange} onBlur={formik.handleBlur} />
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
