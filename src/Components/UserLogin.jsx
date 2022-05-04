import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser, selectUser } from "../features/userSlice";
import Footer from "./Footer";
import "../App.css";

let URL = "";

process.env.REACT_APP_PRODUCTION === "heroku"
  ? (URL = process.env.REACT_APP_URL)
  : (URL = "http://localhost:4000");

export default function UserLogin() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  const sendLoginRequest = async () => {
    const response = axios
      .post(`${URL}/users/login`, {
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
      .then((response) => {
        return response.data;
      });

    return response;
  };

  return (
    <div className="BodyDiv">
      <div className="DivImg">
        <div className="App-header">
          <main className="userLogin">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
            <button
              onClick={async () => {
                let fetchedUser = await sendLoginRequest();
                localStorage.setItem(
                  "user",
                  JSON.stringify(fetchedUser.payload)
                );
                dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
              }}
            >
              SIGN IN
            </button>{" "}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
