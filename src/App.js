import NavBar from "./Components/NavBar";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUserId, selectUserFirstName } from "./features/userSlice";

export default function App() {
  const userId = useSelector(selectUserId);
  const firstName = useSelector(selectUserFirstName);

  // const getLocalStorage = localStorage.getItem("user");
  return (
    <div>
      <NavBar
      // getLocalStorage={getLocalStorage}
      />
      {userId.length > 0 ? (
        <div className="App-header"> Welcome Back {firstName}!</div>
      ) : (
        <div className="App-header">
          <Link className="agentLogIn" to="user-login">
            LOG IN
          </Link>
        </div>
      )}
    </div>
  );
}
