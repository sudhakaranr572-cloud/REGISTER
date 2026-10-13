import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";


function Login() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const [message, setMessage] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const handleLogin =
    async (e) => {

      e.preventDefault();

      setMessage("");

      setLoading(true);


      try {

        const response =
          await axios.post(

            "https://nodelogin-7rzg.onrender.com/api/auth/register",

            {
              email,
              password
            }

          );


        localStorage.setItem(
          "token",
          response.data.token
        );


        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );


        setMessage(
          "Login successful"
        );


        setTimeout(() => {

          navigate("/dashboard");

        }, 500);


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
            PRIVATE ACCESS
          </span>

        </div>


        <div className="gold-line"></div>


        <p className="welcome-text">
          Welcome back, distinguished member
        </p>


        <form
          onSubmit={handleLogin}
        >

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
              placeholder="Enter your password"
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
              ? "AUTHENTICATING..."
              : "ENTER THE REALM"}

          </button>

        </form>


        {message && (

          <p className="royal-message">
            {message}
          </p>

        )}


        <div className="switch-page">

          <span>
            Not a member?
          </span>

          <Link to="/register">
            CREATE ACCOUNT
          </Link>

        </div>


        <div className="card-footer">

          ◆ PRIVATE • SECURE ◆

        </div>

      </div>

    </div>

  );
}


export default Login;