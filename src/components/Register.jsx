import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";


function Register() {

  const navigate =
    useNavigate();


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const [message, setMessage] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const handleRegister =
    async (e) => {

      e.preventDefault();

      setMessage("");

      setLoading(true);


      try {

        const response =
          await axios.post(

            "https://nodelogin-7rzg.onrender.com/api/auth/register",

            {
              name,
              email,
              password
            }

          );


        setMessage(
          response.data.message
        );


        setName("");
        setEmail("");
        setPassword("");


        setTimeout(() => {

          navigate("/login");

        }, 1200);


      } catch (error) {

        setMessage(

          error.response?.data?.message ||
          "Unable to connect to server"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="royal-page">

      <div className="royal-card">

        <div className="royal-logo">
          ♛
        </div>


        <div className="royal-title">

          <h1>
            ROYAL
          </h1>

          <span>
            PRIVATE CLUB
          </span>

        </div>


        <div className="gold-line"></div>


        <p className="welcome-text">
          Create your distinguished account
        </p>


        <form
          onSubmit={handleRegister}
        >

          <div className="input-group">

            <label>
              FULL NAME
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="input-group">

            <label>
              PASSWORD
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <button
            className="royal-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "CREATING..."
              : "CREATE ACCOUNT"}

          </button>

        </form>


        {message && (

          <p className="royal-message">
            {message}
          </p>

        )}


        <div className="switch-page">

          <span>
            Already a member?
          </span>

          <Link to="/login">
            SIGN IN
          </Link>

        </div>


        <div className="card-footer">

          ◆ ESTABLISHED WITH ELEGANCE ◆

        </div>

      </div>

    </div>

  );
}


export default Register;