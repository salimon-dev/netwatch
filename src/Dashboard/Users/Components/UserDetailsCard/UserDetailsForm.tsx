import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, Card, Col, Descriptions, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import type { IUser } from "../../../../specs";
import { dateStringToHuman } from "../../../../time";
import { createUser, updateUser, type UserCreateParams } from "../../../../Rest/users";
import { useNotification } from "../../../../Store/Hooks";
import TextInput from "../../../../Components/Form/TextInput";
import PasswordInput from "../../../../Components/Form/PasswordInput";
import SelectInput from "../../../../Components/Form/SelectInput";
import NumberInput from "../../../../Components/Form/NumberInput";
import InvitationSearchInput from "../../../../Components/Form/InvitationSearchInput";
import { useNavigate } from "react-router-dom";

interface Props {
  user?: IUser;
  onUpdate: () => void;
}
export default function UserDetailsForm({ user, onUpdate }: Props) {
  const notification = useNotification();
  const nvaigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: user ? user.username : "",
        password: "",
        status: user ? user.status : 1,
        description: user ? user.description : "",
        is_public: user ? user.is_public : true,
        credit: user ? user.credit : 0,
        score: user ? user.score : 0,
        base_url: user ? user.base_url : "",
        invitation_id: user ? user.invitation_id : undefined,
      }}
      validationSchema={yup.object({
        username: yup.string().required(),
        password: yup.string().optional(),
        description: yup.string().required(),
        status: yup.number().required(),
        is_public: yup.boolean().required(),
        credit: yup.number().required(),
        score: yup.number().required(),
        invitation_id: yup.string().optional(),
      })}
      onSubmit={async (values, formik) => {
        if (user) {
          const params = values as Partial<UserCreateParams>;
          if (!params.password) params.password = undefined;
          await updateUser(user.id, values);
          notification.success({
            message: "Updated successfully!",
            description: `user ${user.username} updated successfully!`,
            placement: "bottomLeft",
          });
          formik.resetForm({ values });
        } else {
          const result = await createUser(values);
          notification.success({
            message: "Created successfully!",
            description: `user ${values.username} created successfully!`,
            placement: "bottomLeft",
          });
          nvaigate(`/users/${result.id}`);
        }
        onUpdate();
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <Card
            title={user ? "Details" : "Create User"}
            extra={
              <Button htmlType="submit" loading={isSubmitting} disabled={!dirty}>
                <SaveOutlined />
              </Button>
            }
          >
            <Row gutter={12}>
              {user && (
                <Col xs={24} style={{ marginBottom: 18 }}>
                  <UserStaticData user={user} />
                </Col>
              )}
              <Col xs={24} md={12}>
                <TextInput name="username" label="Username" />
              </Col>
              <Col xs={24} md={12}>
                <PasswordInput name="password" label="Password" />
              </Col>
              <Col xs={24}>
                <TextInput name="description" label="Description" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <SelectInput
                  name="status"
                  label="Status"
                  options={[
                    { value: 1, label: "active" },
                    { value: 2, label: "inactive" },
                  ]}
                />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <SelectInput
                  name="is_public"
                  label="Is public"
                  options={[
                    { value: true, label: "yes" },
                    { value: false, label: "no" },
                  ]}
                />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <NumberInput name="credit" label="Credit" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <NumberInput name="score" label="Score" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <TextInput name="base_url" label="Base URL" />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <InvitationSearchInput name="invitation_id" label="Invitation" />
              </Col>
            </Row>
          </Card>
        </Form>
      )}
    </Formik>
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
    </Descriptions>
  );
}
