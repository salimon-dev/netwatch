import { Button, Col, Modal, Row, Space, Typography } from "antd";
import type { IAccessKey } from "../../specs";

interface Props {
  accessKey: IAccessKey;
  onClose: () => void;
}
export default function AccessKeyRegenerateModal({ accessKey, onClose }: Props) {
  return (
    <Modal title="Access Key Regeneration" open={true} onCancel={onClose} footer={null} destroyOnHidden>
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Typography.Text>name: {accessKey.name}</Typography.Text>
        </Col>
        <Col xs={24}>
          <Typography.Text>value: </Typography.Text>
          <Typography.Text code copyable>
            {accessKey.value}
          </Typography.Text>
        </Col>
        <Col xs={24}>
          <Space>
            <Button type="primary" htmlType="submit" onClick={onClose}>
              Close
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
}
