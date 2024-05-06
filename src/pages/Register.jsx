import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ChangeInputHandller = (e) => {
    setUserData((preState) => {
      return { ...preState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        console.log("Pleas try again");
      }
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign UP</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-massage">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={ChangeInputHandller}
          />{" "}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={ChangeInputHandller}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={ChangeInputHandller}
          />
          <input
            type="password"
            placeholder="Comfired Password"
            name="password2"
            value={userData.password2}
            onChange={ChangeInputHandller}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
