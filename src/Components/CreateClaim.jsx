import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectUserId } from "../features/userSlice";
import "../App.css";

// const URL = "http://localhost:4000";

const URL = process.env.REACT_APP_URL || "http://localhost:4000";

export default function CreateClaim() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const userId = useSelector(selectUserId);
  let navigate = useNavigate();

  const sendCreateClaimRequest = async () => {
    axios
      .post(`${URL}/claims/create-claim`, {
        userId: userId,
        title: title,
        description: description,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  // const sendGetUserIdRequest = async () => {
  //   axios
  //     .get(`http://localhost:4000/users/get-userId/${email}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setUserId(response.data.payload);
  //     });
  // };

  return (
    <div className="App-header">
      {userId.length > 0 ? (
        <main className="CreateClaimForm">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              if (userId.length > 0) {
                sendCreateClaimRequest();
                setTitle("");
                setDescription("");
              }
            }}
          >
            Submit Claim
          </button>
        </main>
      ) : (
        <div
          className="agentLogIn"
          onClick={() => {
            navigate("/user-login");
          }}
        >
          LOG IN
        </div>
      )}
    </div>
  );
}
