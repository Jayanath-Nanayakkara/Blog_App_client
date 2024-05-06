import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext.js";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // Correct initialization

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (location.pathname === `/myposts/${currentUser.id}`) {
        navigate(0);
      } else {
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsLoading(false); // Ensure to set isLoading to false in case of error
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button className="btn sm danger" onClick={removePost}>
      Delete
    </button>
  );
};

export default DeletePost;
