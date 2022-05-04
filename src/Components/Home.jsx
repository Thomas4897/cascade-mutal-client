import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Footer from "./Footer";

export default function App() {
  const user = useSelector(selectUser);

  return (
    <div className="BodyDiv">
      <div className="DivImg">
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
      <Footer />
    </div>
  );
}
