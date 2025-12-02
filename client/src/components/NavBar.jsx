import { useEffect } from "react";
import {
  getCurrentAuthUser,
  isAuthenticated,
  signOut,
} from "../services/authService";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { clsx } from "clsx";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const userEmail = getCurrentAuthUser();

  const handleSignOut = async () => {
    const isSignedOut = await signOut();

    if (isSignedOut) {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className="mr-2"
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>Halifax Bikes</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav mr-auto">
            <li
              className={clsx(
                "nav-item",
                location.pathname === "/" && "active"
              )}
            >
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {isLoggedIn && (
              <li
                className={clsx(
                  "nav-item",
                  location.pathname === "/bikes/create" && "active"
                )}
              >
                <Link className="nav-link" to="/bikes/create">
                  create a bike
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li
                  className={clsx(
                    "nav-item",
                    location.pathname === "/sign-in" && "active"
                  )}
                >
                  <Link
                    className="nav-link"
                    to="/sign-in"
                    key={`sign-in-${isLoggedIn}`}
                    onClick={() => console.log("Sign-in link clicked!")}
                  >
                    Sign-in
                  </Link>
                </li>
                <li
                  className={clsx(
                    "nav-item",
                    location.pathname === "/register" && "active"
                  )}
                >
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/#"
                    id="dropdown07"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Welcome {userEmail}
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdown07">
                    {/* <Link className="dropdown-item" to="/sign-out">
                      Sign out
                    </Link> */}
                    <button className="dropdown-item" onClick={handleSignOut}>
                      Log Out
                    </button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
