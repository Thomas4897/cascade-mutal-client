import { useState } from "react";
import axios from "axios";
import "../App.css";

const URL = "http://localhost:4000";

export default function ClaimHistory() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sendCreateClaimRequest = async () => {
    axios
      .post(`${URL}/claims/create-claim`, {
        userId: "c7e36289-2ae0-487e-a1b3-f585c89ef47c",
        title: title,
        description: description,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const sendGetUserIdRequest = async () => {
    axios
      .get(`http://localhost:4000/users/get-userId/${email}`)
      .then((response) => {
        console.log(response.data);
        setUserId(response.data.payload);
      });
  };

  return (
    <main className="CreateClaimForm">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(email);
        }}
      ></input>

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
          sendGetUserIdRequest();
          sendCreateClaimRequest();
        }}
      >
        Submit Claim
      </button>
    </main>
  );
}
