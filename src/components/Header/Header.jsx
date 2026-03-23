import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  const navigationLinks = [
    { label: "Home", Path: "/" },
    { label: "WishList", Path: "/wishlist" },
    { label: "About", Path: "/about" },
    { label: "Feedback", Path: "/feedback" },
    { label: "Contact", Path: "/contact" },
  ];
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const handleItemClick = () => {
    setShowMobileSidebar(true);
  };
  return (
    <header>
      {/* Mobile Menu Icon */}
      <nav>
        <div className="navtop">
          <h3>
            <Link
              to="/"
              onClick={() => showMobileSidebar && setShowMobileSidebar(false)}
              className="project-title"
            >
              RB-VISUALSTORE
            </Link>
          </h3>
          <div
            className={`mobile-menu-icon ${!showMobileSidebar ? "active" : ""}`}
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          >
            {Array.from({ length: 2 + showMobileSidebar }, (_, i) => (
              <div
                key={i}
                className={
                  i === 0 ? "firstbar" : i === 1 ? "secondbar" : "lastbar"
                }
              />
            ))}
            {/* If the condition is true, only the first, second, and last div elements will be rendered. */}
          </div>
        </div>
        {/* Desktop Navigation */}
      </nav>
      <ul className={`desktop-nav ${showMobileSidebar ? "" : "show"}`}>
        {navigationLinks.map((items, key) => {
          return (
            <li key={key} onClick={handleItemClick}>
              <Link to={items.Path}>{items.label}</Link>
            </li>
          );
        })}

        {!currentUser && (
          <>
            <li onClick={handleItemClick}>
              <Link to="/sign-in">SignIn</Link>
            </li>
            <li onClick={handleItemClick}>
              <Link to="/sign-up">SignUp</Link>
            </li>
          </>
        )}

        {currentUser && (
          <>
            <li className="header-user">Hi, {currentUser.name}</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
