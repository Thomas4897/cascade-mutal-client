import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, resetState, addUser } from "../features/userSlice";
import { useNavigate } from "react-router";
import logo from "../logo.png";

import { useEffect } from "react";

import "../App.css";

export default function NavBar() {
  let navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
  }, []);

  return (
    <div>
      <div className="App-NavBar">
        <div className="cascadeLogo">
          <img src={logo}></img>
        </div>
        <nav className="NavBar-Links">
          <Link className="link" to="/">
            HOME
          </Link>
          <Link className="link" to="claims">
            CLAIMS
          </Link>
        </nav>
        <div className="NavBar-LoginContact">
          {user === null ? (
            <Link className="agentLogIn" to="user-login">
              LOG IN
            </Link>
          ) : (
            <Link
              className="agentLogIn"
              to="/"
              onClick={() => {
                localStorage.removeItem("user");
                dispatch(resetState());
                navigate("user-login");
              }}
            >
              LOG OUT
            </Link>
          )}{" "}
          <Link className="contactUs" to="contact-us">
            CONTACT US
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
