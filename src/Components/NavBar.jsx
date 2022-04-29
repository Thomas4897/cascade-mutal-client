import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserId, selectUserId, resetState } from "../features/userSlice";
import { useNavigate } from "react-router";

import "../App.css";

export default function NavBar() {
  let navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="App-NavBar">
        <div className="cascadeLogo">
          <img src="cascade-mutal-client/src/cascade-mutual-logo.jpeg" />
        </div>
        <nav className="NavBar-Links">
          <Link className="link" to="/">
            HOME
          </Link>
          {/* <Link className="link" to="about">
            ABOUT US
          </Link>
          <Link className="link" to="policies">
            POLICIES
          </Link>
          <Link className="link" to="packages">
            PACAKAGES
          </Link> */}
          <Link className="link" to="claims">
            CLAIMS
          </Link>
          {/* <Link className="link" to="makePayment">
            MAKE PAYMENT
          </Link> */}
        </nav>
        <div className="NavBar-LoginContact">
          {userId.length <= 0 ? (
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
