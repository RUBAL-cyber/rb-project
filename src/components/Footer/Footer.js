import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setMessage("Network error. Please check your connection and try again.");
    }

    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="contact" id="contact">
      <div className="main-content">
        <div className="contact-content">
          <Link to="/"> Home </Link>
          <Link
            to="/about"
          >
            About
          </Link>
          <Link to="/"> FAQ </Link>
          <Link to="/"> Services </Link>
        </div>

        <div className="contact-content">
          <Link to="/"> Shipping & Returns </Link>
          <Link to="/"> Store Policy </Link>
          <Link to="/"> Payment Method </Link>
        </div>

        <div className="contact-content">
          <Link to="/feedback"> Feedback </Link>
          <Link to="mailto:RUBAL@gmail.com" target="_blank">
            Contact
          </Link>
          <Link to="/"> Tel: 123-456-7890 </Link>
        </div>

        <div className="contact-content">
          <Link
            to="https://github.com/RUBAL-cyber/RB-VisualStore"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            to="https://www.linkedin.com/in/rubal-cyber-4ab216196/"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link to="https://twitter.com/RUBAL" target="_blank">
            Twitter
          </Link>
        </div>
      </div>

      <div class="action">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input type="submit" name="submit" value="Submit" />
        </form>
        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      </div>
      <div class="last">
        <p>@ 2023 AR-Website | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
