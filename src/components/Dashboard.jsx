import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";


function Dashboard() {

  const navigate =
    useNavigate();


  const [user, setUser] =
    useState(null);


  const [history, setHistory] =
    useState([]);


  const [activePage, setActivePage] =
    useState("dashboard");


  const [darkMode, setDarkMode] =
    useState(true);


  const [message, setMessage] =
    useState("");


  const [profileForm, setProfileForm] =
    useState({

      name: "",
      email: "",
      phone: "",
      address: ""

    });


  const [passwordForm, setPasswordForm] =
    useState({

      currentPassword: "",
      newPassword: ""

    });


  const token =
    localStorage.getItem("token");


  const config = {

    headers: {

      Authorization:
        `Bearer ${token}`

    }

  };


  useEffect(() => {

    fetchProfile();

    fetchLoginHistory();

  }, []);


  const fetchProfile =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:5000/api/auth/profile",

            config

          );


        setUser(
          response.data.user
        );


        setProfileForm({

          name:
            response.data.user.name,

          email:
            response.data.user.email,

          phone:
            response.data.user.phone || "",

          address:
            response.data.user.address || ""

        });


      } catch (error) {

        if (
          error.response?.status === 401
        ) {

          logout();

        }

      }

    };


  const fetchLoginHistory =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:5000/api/auth/login-history",

            config

          );


        setHistory(
          response.data.history
        );


      } catch (error) {

        console.log(error);

      }

    };


  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  const updateProfile =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.put(

            "http://localhost:5000/api/auth/profile",

            profileForm,

            config

          );


        setUser(
          response.data.user
        );


        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )

        );


        setMessage(
          "Profile updated successfully"
        );


      } catch (error) {

        setMessage(

          error.response?.data?.message ||
          "Update failed"

        );

      }

    };


  const changePassword =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.put(

            "http://localhost:5000/api/auth/change-password",

            passwordForm,

            config

          );


        setMessage(
          response.data.message
        );


        setPasswordForm({

          currentPassword: "",
          newPassword: ""

        });


      } catch (error) {

        setMessage(

          error.response?.data?.message ||
          "Password change failed"

        );

      }

    };


  const handleProfileChange =
    (e) => {

      setProfileForm({

        ...profileForm,

        [e.target.name]:
          e.target.value

      });

    };


  const handlePasswordChange =
    (e) => {

      setPasswordForm({

        ...passwordForm,

        [e.target.name]:
          e.target.value

      });

    };


  const formatDate =
    (date) => {

      if (!date) {
        return "Not available";
      }

      return new Date(date)
        .toLocaleString();

    };


  return (

    <div
      className={
        darkMode
          ? "dashboard-page"
          : "dashboard-page light-dashboard"
      }
    >


      {/* ================= NAVBAR ================= */}

      <nav className="royal-navbar">


        <div className="brand">

          <div className="brand-symbol">
            ♛
          </div>

          <div>

            <h2>
              ROYAL
            </h2>

            <span>
              PRIVATE CLUB
            </span>

          </div>

        </div>


        <div className="nav-right">

          <button
            className="theme-button"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >

            {darkMode
              ? "☀"
              : "☾"}

          </button>


          <button
            className="logout-button"
            onClick={logout}
          >

            LOGOUT

          </button>

        </div>

      </nav>


      {/* ================= BODY ================= */}

      <div className="dashboard-layout">


        {/* ================= SIDEBAR ================= */}

        <aside className="sidebar">

          <div
            className={
              activePage === "dashboard"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage("dashboard")
            }
          >

            <span>♛</span>

            Dashboard

          </div>


          <div
            className={
              activePage === "profile"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage("profile")
            }
          >

            <span>♙</span>

            My Profile

          </div>


          <div
            className={
              activePage === "notifications"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage("notifications")
            }
          >

            <span>♢</span>

            Notifications

            <b>3</b>

          </div>


          <div
            className={
              activePage === "security"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage("security")
            }
          >

            <span>◆</span>

            Security

          </div>


          <div
            className={
              activePage === "settings"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              setActivePage("settings")
            }
          >

            <span>⚙</span>

            Settings

          </div>


          <div
            className="sidebar-logout"
            onClick={logout}
          >

            <span>↪</span>

            Logout

          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="dashboard-main">


          {/* DASHBOARD */}

          {activePage === "dashboard" && (

            <>

              <div className="dashboard-header">

                <span className="small-heading">
                  PRIVATE MEMBER AREA
                </span>


                <h1>

                  Welcome,

                  <br />

                  <span>
                    {user?.name || "Member"}
                  </span>

                </h1>


                <div className="gold-line dashboard-line"></div>


                <p>
                  Your private royal dashboard
                  and member management center.
                </p>

              </div>


              <div className="dashboard-grid">


                <div className="royal-info-card">

                  <div className="card-icon">
                    ♛
                  </div>

                  <h3>
                    MEMBER
                  </h3>

                  <p>
                    {user?.name}
                  </p>

                </div>


                <div className="royal-info-card">

                  <div className="card-icon">
                    ✉
                  </div>

                  <h3>
                    EMAIL
                  </h3>

                  <p>
                    {user?.email}
                  </p>

                </div>


                <div className="royal-info-card">

                  <div className="card-icon">
                    ◆
                  </div>

                  <h3>
                    STATUS
                  </h3>

                  <p className="active-status">
                    {user?.status}
                  </p>

                </div>


                <div className="royal-info-card">

                  <div className="card-icon">
                    ◷
                  </div>

                  <h3>
                    LAST LOGIN
                  </h3>

                  <p>
                    {formatDate(
                      user?.lastLogin
                    )}
                  </p>

                </div>


              </div>


              <div className="royal-welcome-card">

                <div className="crown">
                  ♛
                </div>

                <h2>
                  Welcome to the Royal Club
                </h2>

                <p>
                  Your account has been
                  successfully authenticated.
                  Manage your profile,
                  security and account
                  settings from this
                  private dashboard.
                </p>

              </div>

            </>

          )}


          {/* PROFILE */}

          {activePage === "profile" && (

            <section className="content-section">

              <div className="section-title">

                <span>
                  MEMBER PROFILE
                </span>

                <h1>
                  My Profile
                </h1>

              </div>


              <form
                className="profile-form"
                onSubmit={updateProfile}
              >

                <div className="profile-avatar">
                  ♛
                </div>


                <label>
                  FULL NAME
                </label>

                <input
                  name="name"
                  value={profileForm.name}
                  onChange={
                    handleProfileChange
                  }
                />


                <label>
                  EMAIL
                </label>

                <input
                  name="email"
                  type="email"
                  value={profileForm.email}
                  onChange={
                    handleProfileChange
                  }
                />


                <label>
                  PHONE
                </label>

                <input
                  name="phone"
                  value={profileForm.phone}
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter phone number"
                />


                <label>
                  ADDRESS
                </label>

                <textarea
                  name="address"
                  value={profileForm.address}
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter address"
                ></textarea>


                <button
                  className="royal-button"
                  type="submit"
                >
                  SAVE PROFILE
                </button>


                {message && (
                  <p className="royal-message">
                    {message}
                  </p>
                )}

              </form>

            </section>

          )}


          {/* NOTIFICATIONS */}

          {activePage === "notifications" && (

            <section className="content-section">

              <div className="section-title">

                <span>
                  MEMBER ACTIVITY
                </span>

                <h1>
                  Notifications
                </h1>

              </div>


              <div className="notification-list">


                <div className="notification">
                  <span>✓</span>

                  <div>
                    <h3>
                      Welcome to Royal Club
                    </h3>

                    <p>
                      Your account was
                      successfully created.
                    </p>
                  </div>
                </div>


                <div className="notification">
                  <span>✓</span>

                  <div>
                    <h3>
                      Login Successful
                    </h3>

                    <p>
                      You successfully
                      signed into your account.
                    </p>
                  </div>
                </div>


                <div className="notification">
                  <span>◆</span>

                  <div>
                    <h3>
                      Profile Ready
                    </h3>

                    <p>
                      Complete your profile
                      for a better experience.
                    </p>
                  </div>
                </div>


              </div>

            </section>

          )}


          {/* SECURITY */}

          {activePage === "security" && (

            <section className="content-section">

              <div className="section-title">

                <span>
                  ACCOUNT PROTECTION
                </span>

                <h1>
                  Security
                </h1>

              </div>


              <div className="security-card">

                <div>
                  <strong>
                    Account Status
                  </strong>

                  <span>
                    ✓ SECURE
                  </span>
                </div>


                <div>
                  <strong>
                    Password
                  </strong>

                  <span>
                    ✓ PROTECTED
                  </span>
                </div>


                <div>
                  <strong>
                    Authentication
                  </strong>

                  <span>
                    ✓ JWT
                  </span>
                </div>

              </div>


              <form
                className="profile-form"
                onSubmit={changePassword}
              >

                <h2>
                  Change Password
                </h2>


                <label>
                  CURRENT PASSWORD
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={
                    passwordForm.currentPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  required
                />


                <label>
                  NEW PASSWORD
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={
                    passwordForm.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  required
                />


                <button
                  className="royal-button"
                  type="submit"
                >
                  CHANGE PASSWORD
                </button>


                {message && (
                  <p className="royal-message">
                    {message}
                  </p>
                )}

              </form>


              <h2 className="history-heading">
                Login History
              </h2>


              <div className="history-list">

                {history.length === 0 && (

                  <p>
                    No login history available.
                  </p>

                )}


                {history.map(
                  (item) => (

                    <div
                      className="history-item"
                      key={item._id}
                    >

                      <div>

                        <strong>
                          {item.device.substring(
                            0,
                            55
                          )}
                        </strong>

                        <p>
                          IP:
                          {" "}
                          {item.ipAddress}
                        </p>

                      </div>


                      <span>
                        {formatDate(
                          item.loginDate
                        )}
                      </span>

                    </div>

                  )
                )}

              </div>

            </section>

          )}


          {/* SETTINGS */}

          {activePage === "settings" && (

            <section className="content-section">

              <div className="section-title">

                <span>
                  ACCOUNT PREFERENCES
                </span>

                <h1>
                  Settings
                </h1>

              </div>


              <div className="settings-list">


                <div className="setting-row">

                  <div>

                    <h3>
                      Appearance
                    </h3>

                    <p>
                      Choose your preferred
                      dashboard appearance.
                    </p>

                  </div>


                  <button
                    className="small-action"
                    onClick={() =>
                      setDarkMode(
                        !darkMode
                      )
                    }
                  >

                    {darkMode
                      ? "LIGHT"
                      : "DARK"}

                  </button>

                </div>


                <div className="setting-row">

                  <div>

                    <h3>
                      Account Status
                    </h3>

                    <p>
                      Your account is currently
                      active.
                    </p>

                  </div>

                  <span className="setting-status">
                    ACTIVE
                  </span>

                </div>


                <div className="setting-row">

                  <div>

                    <h3>
                      Email Notifications
                    </h3>

                    <p>
                      Receive account activity
                      notifications.
                    </p>

                  </div>

                  <span className="toggle-on">
                    ON
                  </span>

                </div>


              </div>

            </section>

          )}

        </main>

      </div>

    </div>

  );
}


export default Dashboard;