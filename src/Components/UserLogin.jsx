import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserId,
  deleteUserId,
  resetState,
  selectUserId,
  setEmail,
  setFirstName,
  setLastName,
  selectUserEmail,
  selectUserFirstName,
  selectUserLastName,
} from "../features/userSlice";
import "../App.css";

// const URL = "http://localhost:4000";

// const URL = process.env.REACT_APP_URL || "http://localhost:4000";

let URL = "";

process.env.REACT_APP_PRODUCTION === "heroku"
  ? (URL = process.env.REACT_APP_URL)
  : (URL = "http://localhost:4000");

// const sendGetRequest = async () => {
//   axios.get(`/users/`).then((response) => {
//     console.log(response.data);
//   });
// };

export default function UserLogin() {
  const userId = useSelector(selectUserId);
  const email = useSelector(selectUserEmail);
  const firstName = useSelector(selectUserFirstName);
  const lastName = useSelector(selectUserLastName);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (userId.length > 0) {
      navigate("/");
    }
  }, [userId]);

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
    <div className="App-header">
      <main className="userLogin">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            dispatch(setEmail(e.target.value));
          }}
        ></input>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            dispatch(setFirstName(e.target.value));
          }}
        ></input>
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            dispatch(setLastName(e.target.value));
          }}
        ></input>
        <button
          onClick={async () => {
            let fetchedUserId = await sendLoginRequest();
            localStorage.setItem("user", fetchedUserId.payload);
            dispatch(addUserId(localStorage.getItem("user")));
          }}
        >
          SIGN IN
        </button>{" "}
      </main>
    </div>
  );
}
