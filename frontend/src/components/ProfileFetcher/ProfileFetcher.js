import React, { useEffect, useState } from "react";
import "./ProfileFetcher.css";

import { useParams } from "react-router-dom";

import Profile from "../Profile";
import ErrorCard from "../ErrorCard";

const ProfileFetcher = () => {
  const [userProfile, setUserProfile] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const username = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: username.username,
      redirect: "follow",
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("User not found");
      }
    }).then((data) => setUserProfile(data))
    .catch(() => {
      setErrorMessage("User not found");
    });
  }, [username]);

  console.log(userProfile);
  console.log(errorMessage);
  return (
    <>
      {errorMessage ? (
        <ErrorCard message={errorMessage} />
      ) : (
        <Profile userProfile={userProfile} />
      )}
    </>
  );
};

export default ProfileFetcher;
