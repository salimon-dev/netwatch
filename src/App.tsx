import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import { useIsLoggedIn } from "./Store/Hooks";
import Setup from "./Setup/Setup";
import Dashboard from "./Dashboard/Dashboard";

export default function App() {
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn) {
    return (<Routes>
      <Route path="/" element={<Login />} />
      <Route path="/setup" element={<Setup />} />
    </Routes>);
  } else {
    return <Dashboard />
  }
}
