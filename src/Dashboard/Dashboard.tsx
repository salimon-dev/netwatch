import { useMemo, useState } from "react";
import {
  BankOutlined,
  ClusterOutlined,
  FileOutlined,
  HomeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space, theme, Tooltip, Typography } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Styles from "./styles.module.css";
import LogoIcon from "../Icons/LogoIcon";
import Home from "./Home/Home";
import Users from "./Users/Users";
import Invitations from "./Invitations/Invitations";
import Transactions from "./Transactions/Transactions";
import CreateUser from "./Users/CreateUser";
import { usePermissions } from "../Store/Hooks";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { clearAuth } from "../Store/auth";
import EditUser from "./Users/EditUser";
import { showInvitationsMenu, showPermissionsMenu, showTransactionsMenu, showUsersMenu } from "./utils";

const { Header, Content, Sider } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const keys = useMemo(() => {
    const [prefix, section] = location.pathname.split("/");
    return [[prefix, section].join("/")];
  }, []);

  const permissions = usePermissions();
  const items = useMemo(() => {
    const result: ItemType<MenuItemType>[] = [
      {
        label: "Home",
        icon: <HomeOutlined />,
        key: "/",
        onClick: () => {
          navigate("/");
        },
      },
    ];
    if (showUsersMenu(permissions))
      result.push({
        label: "Users",
        icon: <UserOutlined />,
        key: "/users",
        onClick: () => {
          navigate("/users");
        },
      });
    if (showInvitationsMenu(permissions)) {
      result.push({
        label: "Invitations",
        icon: <FileOutlined />,
        key: "/invitations",
        onClick: () => {
          navigate("/invitations");
        },
      });
    }
    if (showTransactionsMenu(permissions)) {
      result.push({
        label: "Transactions",
        icon: <BankOutlined />,
        key: "/transactions",
        onClick: () => {
          navigate("/transactions");
        },
      });
    }
    if (showPermissionsMenu(permissions)) {
      result.push({
        label: "Permissions",
        icon: <ClusterOutlined />,
        key: "/permissions",
        onClick: () => {
          navigate("/permissions");
        },
      });
    }
    return result;
  }, [permissions, navigate]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={Styles.headerLogo}>
          <LogoIcon style={{ width: 46, height: 46, stroke: "#FFF" }} />
          {!collapsed && (
            <Typography.Title level={4} style={{ color: "#FFF", margin: 0 }}>
              Net Watch
            </Typography.Title>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={keys} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 18px",
            background: colorBgContainer,
            justifyContent: "end",
            display: "flex",
          }}
        >
          <Space>
            <Tooltip title="logout">
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  clearAuth();
                  navigate("/");
                }}
              >
                <LockOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="profile">
              <Button type="text" shape="circle">
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
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
