import React, { useEffect, useState } from "react";
import "./ProfileFetcher.css";

import { useParams } from "react-router-dom";

import Profile from "../Profile";
import ErrorCard from "../ErrorCard";

const ProfileFetcher = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const username = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: username.username,
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error("User not found");
        }
      })
      .then((data) => setUserProfile(data))
      .catch(() =>
        setError({
          title: "User not found:",
          message:
            "An error has occurred while trying to reach the server, try again later.",
        })
      )
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <div class='d-flex justify-content-center align-items-center h-100'>
      {error ? (
        <ErrorCard error={error} />
      ) : loading ? (
        <div class='spinner-border' role='status'>
          <span class='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <Profile userProfile={userProfile} />
      )}
    </div>
  );
};

export default ProfileFetcher;
