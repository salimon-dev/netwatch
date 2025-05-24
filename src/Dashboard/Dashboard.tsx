import { useMemo, useState } from 'react';
import {
    BankOutlined,
    FileOutlined,
    HomeOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Space, theme, Tooltip, Typography } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Styles from './styles.module.css'
import LogoIcon from '../Icons/LogoIcon';
import Home from './Home/Home';
import Users from './Users/Users';
import Invitations from './Invitations/Invitations';
import Transactions from './Transactions/Transactions';
import CreateUser from './Users/CreateUser';

const { Header, Content, Sider } = Layout;

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    const keys = useMemo(() => {
        const [prefix, section] = location.pathname.split('/');
        return [[prefix, section].join('/')]

    }, [location.pathname])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className={Styles.headerLogo}>
                    <LogoIcon style={{ width: 46, height: 46, stroke: "#FFF" }} />
                    {!collapsed && <Typography.Title level={4} style={{ color: "#FFF", margin: 0 }}>Net Watch</Typography.Title>}
                </div>
                <Menu theme="dark" defaultSelectedKeys={keys} mode="inline" items={[
                    {
                        label: "Home",
                        icon: <HomeOutlined />,
                        key: "/",
                        onClick: () => { navigate('/') }
                    },
                    {
                        label: "Users",
                        icon: <UserOutlined />,
                        key: "/users",
                        onClick: () => { navigate('/users') }
                    },
                    {
                        label: "Invitations",
                        icon: <FileOutlined />,
                        key: "/invitations",
                        onClick: () => { navigate('/invitations') }
                    },
                    {
                        label: "Transactions",
                        icon: <BankOutlined />,
                        key: "/transactions",
                        onClick: () => { navigate('/transactions') }
                    }
                ]} />
            </Sider>
            <Layout>
                <Header style={{ padding: "0px 18px", background: colorBgContainer, justifyContent: "end", display: "flex" }}>
                    <Space>
                        <Tooltip title="logout">
                            <Button type='text' shape='circle'>
                                <LockOutlined />
                            </Button>
                        </Tooltip>
                        <Tooltip title="profile">
                            <Button type='text' shape='circle'>
                                <UserOutlined />
                            </Button>
                        </Tooltip>
                    </Space>
                </Header>
                <Content style={{ margin: 16 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/create" element={<CreateUser />} />
                        <Route path="/invitations" element={<Invitations />} />
                        <Route path="/transactions" element={<Transactions />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};