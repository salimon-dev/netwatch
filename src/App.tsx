import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import { useIsLoggedIn } from "./Store/Hooks";
import Setup from "./Auth/Setup";
import Dashboard from "./Dashboard/Dashboard";
import { useAtomValue } from "jotai";
import { bootstrapStateAtom } from "./Store/store";
import { Col, Row, Typography } from "antd";

export default function App() {
  const isLoggedIn = useIsLoggedIn();
  const bootstrapState = useAtomValue(bootstrapStateAtom);

  if (bootstrapState !== "done") {
    return (
      <Row style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Col xs={24} style={{ textAlign: "center" }}>
          <Typography>Loading...</Typography>
        </Col>
      </Row>
    );
  }
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  } else {
    return <Dashboard />;
  }
}
