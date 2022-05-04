import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function App() {
  const user = useSelector(selectUser);

  return (
    <div>
      {user !== null ? (
        <div className="App-header"> Welcome Back {user.firstName}!</div>
      ) : (
        <div className="App-header">
          <Link className="agentLogIn" to="/user-login">
            LOG IN
          </Link>
        </div>
      )}
    </div>
  );
}
