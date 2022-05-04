import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../App.css";
import ClaimHistory from "./ClaimHistory";
import Footer from "./Footer";

let URL = "";

process.env.REACT_APP_PRODUCTION === "heroku"
  ? (URL = process.env.REACT_APP_URL)
  : (URL = "http://localhost:4000");

export default function CreateClaim() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector(selectUser);
  const [claimHistoryArray, setClaimHistoryArray] = useState([]);

  const sendCreateClaimRequest = async () => {
    axios
      .post(`${URL}/claims/create-claim`, {
        userId: user.userId,
        title: title,
        description: description,
      })
      .then((response) => {
        setClaimHistoryArray(response.data.payload);
      });
  };

  useEffect(() => {
    const sendCreateClaimRequest = async () => {
      axios
        .get(
          `${URL}/users/claim-history/${
            JSON.parse(localStorage.getItem("user")).userId
          }`
        )
        .then((response) => {
          setClaimHistoryArray(response.data.payload);
        });
    };

    sendCreateClaimRequest();
  }, []);

  return (
    <div className="BodyDiv">
      <div className="DivImg">
        {user !== null ? (
          <div className="App-header">
            <main className="Container">
              <div className="CreateClaimForm">
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
                    if (title.length > 0 && description.length > 0) {
                      if (user !== null) {
                        sendCreateClaimRequest();
                        setTitle("");
                        setDescription("");
                      }
                    }
                  }}
                >
                  Submit Claim
                </button>
              </div>
              <div>
                <ClaimHistory claimHistoryArray={claimHistoryArray} />
              </div>
            </main>
          </div>
        ) : (
          <div className="BodyDiv">
            <div className="DivImg">
              <div className="App-header">
                <Link className="agentLogIn" to="/user-login">
                  LOG IN
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// const sendGetUserIdRequest = async () => {
//   axios
//     .get(`http://localhost:4000/users/get-userId/${email}`)
//     .then((response) => {
//       console.log(response.data);
//       setUserId(response.data.payload);
//     });
// };
