import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Col, Descriptions, Form, Input, Row, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import type { IUser } from "../../../../specs";
import { dateStringToHuman } from "../../../../time";

interface Props {
  user?: IUser;
  onUpdate: () => void;
}
export default function UserDetailsForm({ user, onUpdate }: Props) {
  const formik = useFormik({
    initialValues: {
      username: user ? user.username : "",
      password: "",
      status: user ? user.status : 1,
      description: user ? user.description : "",
      is_public: user ? user.is_public : true,
      credit: user ? user.credit : 0,
      score: user ? user.score : 0,
      base_url: user ? user.base_url : "",
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      description: yup.string().required(),
      status: yup.number().required(),
      is_public: yup.boolean().required(),
      credit: yup.number().required(),
      score: yup.number().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // TODO: set formik touched to false after submit
      onUpdate();
    },
  });
  return (
    <Card
      title={user ? "Details" : "Create User"}
      extra={
        <Button htmlType="submit" loading={formik.isSubmitting} disabled={!formik.dirty}>
          <SaveOutlined />
        </Button>
      }
    >
      <Form onFinish={formik.submitForm}>
        <Row gutter={12}>
          {user && (
            <Col xs={24} style={{ marginBottom: 18 }}>
              <UserStaticData user={user} />
            </Col>
          )}
          <Col xs={24} md={12}>
            <Form.Item
              name="username"
              label="Username"
              initialValue={formik.values.username}
              help={formik.touched.username && formik.errors.username ? formik.errors.username : undefined}
            >
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="password"
              label="Password"
              initialValue={formik.values.password}
              help={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
            >
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description"
              initialValue={formik.values.description}
              help={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : undefined
              }
            >
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              name="status"
              label="Status"
              initialValue={formik.values.status}
              help={formik.touched.status && formik.errors.status ? formik.errors.status : undefined}
            >
              <Select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
                options={[
                  { value: 1, label: "active" },
                  { value: 2, label: "inactive" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              name="is_public"
              label="Is public"
              initialValue={formik.values.is_public}
              help={formik.touched.is_public && formik.errors.is_public ? formik.errors.is_public : undefined}
            >
              <Select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.is_public}
                options={[
                  { value: true, label: "yes" },
                  { value: false, label: "no" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              name="credit"
              label="Credit"
              initialValue={formik.values.credit}
              help={formik.touched.credit && formik.errors.credit ? formik.errors.credit : undefined}
            >
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.credit}
                type="number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              name="score"
              label="Score"
              initialValue={formik.values.score}
              help={formik.touched.score && formik.errors.score ? formik.errors.score : undefined}
            >
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.score}
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

interface UserStaticDataProps {
  user: IUser;
}
function UserStaticData({ user }: UserStaticDataProps) {
  return (
    <Descriptions>
      <Descriptions.Item label="Registered at">{dateStringToHuman(user.registered_at)}</Descriptions.Item>
      <Descriptions.Item label="Last updated at">{dateStringToHuman(user.updated_at)}</Descriptions.Item>
      <Descriptions.Item label="Invited by">
        {user.invitation_id ? user.invitation_id : "N.D"}
      </Descriptions.Item>
    </Descriptions>
  );
}
