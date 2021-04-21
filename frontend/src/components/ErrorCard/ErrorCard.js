import React from "react";
import "./ErrorCard.css";

const ErrorCard = ({ error }) => {
  return (
    <div class='card border-danger mx-auto errorCard'>
      <div class='card-header'>Error</div>
      <div class='card-body text-danger'>
        <h5 class='card-title'>{error.title}</h5>
        <p class='card-text'>
          {error.message}
        </p>
      </div>
    </div>
  );
};

export default ErrorCard;
