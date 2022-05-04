import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../App.css";

let URL = "";

process.env.REACT_APP_PRODUCTION === "heroku"
  ? (URL = process.env.REACT_APP_URL)
  : (URL = "http://localhost:4000");

export default function ClaimHistory({ claimHistoryArray }) {
  // const user = useSelector(selectUser);

  return (
    <main className="CreateClaimForm">
      <div className="ClaimHistory">
        <h3 className="ClaimHistoryHeader">Claim History</h3>
        <div className="ClaimHistoryDisplay">
          {claimHistoryArray.map((e) => {
            return (
              <div key={e.claimId} className="Claims">
                <div className="ClaimTitle">Title: {e.title}</div>
                <div className="ClaimDate">Claim Date: {e.creationDate}</div>
                <div className="ClaimID">Claim ID: {e.claimId}</div>
                <div className="ClaimDescription">
                  Description: {e.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
