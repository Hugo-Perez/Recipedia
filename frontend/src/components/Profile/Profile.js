import React from "react";
import "./Profile.css";

const Profile = ({userProfile}) => {

  console.log(userProfile);

  return (
    <div id="profileCard" className="bg-dark text-light card col-md-8 mx-auto p-3 mt-5">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="mw-100 d-block rounded-circle mx-auto p-2 bg-dark bg-gradient"
            src={`/images/profile/${userProfile.image || "default-user.png"}`}
            alt="Profile picture"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{userProfile.username}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
