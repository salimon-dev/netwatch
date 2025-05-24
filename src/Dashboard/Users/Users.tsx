import { Button, Card, Col, Row, Space, Table } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
export default function Users() {
    const navigate = useNavigate();
    return (
        <Card title="Users" extra={<Space>
            <Button shape="circle" type="text" onClick={() => {
                navigate('/users/create');
            }}>
                <PlusOutlined />
            </Button>
        </Space>}>
            <Row gutter={2}>
                <Col xs={24}>
                    <Table columns={[
                        { key: 'num', dataIndex: 'num', title: '#' },
                        { key: 'username', dataIndex: 'username', title: 'username' },
                        { key: 'credit', dataIndex: 'credit', title: 'credit' },
                        { key: 'score', dataIndex: 'score', title: 'score' },
                        { key: 'registered_at', dataIndex: 'registered_at', title: 'registered at' },
                        { key: 'updated_at', dataIndex: 'updated_at', title: 'updated at' },
                        { key: 'actions', dataIndex: 'actions', title: '' }
                    ]
                    } />
                </Col>
            </Row>
        </Card>
    )
}