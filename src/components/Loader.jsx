import React from "react";
import LoadingGif from "../images/Spinner-1s-200px.gif";
import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image">
        <img src={LoadingGif} alt="" />
      </div>
    </div>
  );
};

export default Loader;
