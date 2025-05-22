import Login from "./Auth/Login";
import { useIsLoggedIn } from "./Store/Hooks";

export default function App() {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) return <Login />;
  return <div>app</div>;
}
