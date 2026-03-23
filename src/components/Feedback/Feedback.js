/* eslint-disable no-useless-concat */

import React, { useEffect, useRef } from "react";
import "./Feedback.css";

const Feedback = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendMail = async () => {
    const likes = document.getElementById("liked").value;
    const usersname = document.getElementById("username").value;
    const usersemail = document.getElementById("useremail").value;
    const improvement = document.getElementById("improve").value;
    const feature = document.getElementById("features").value;
    const comment = document.getElementById("comments").value;

    // Validate required fields
    if (!usersname || !usersemail || !comment) {
      window.swal(
        "Validation Error",
        "Please fill in all required fields (Name, Email, Comments)",
        "error"
      );
      return;
    }

    const templateParams = {
      from_name: usersname,
      from_email: usersemail,
      likes: likes,
      improvement: improvement,
      feature: feature,
      comments: comment,
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      const data = await response.json();

      if (data.success) {
        window.swal(
          "Success",
          "Thanks! We've received your feedback",
          "success"
        ).then(() => {
          formRef.current.reset();
        });
      } else {
        window.swal(
          "Error",
          data.message || "Failed to send feedback. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      window.swal(
        "Network Error",
        "Please check your connection and try again.",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <h1>Your Feedback ✍️ Our Evolution 🚀</h1>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Name:</label><br/>
        <input type="text" id="username" placeholder="Your Name..." />
        <br />

        <label htmlFor="useremail">Email:</label><br/>
        <input type="text" id="useremail" placeholder="Your Email..." />
        <br />

        <label htmlFor="liked">What did you like most about RB-VisualStore?</label>
        <input type="text" id="liked" placeholder="I would Like to say..." />
        <br />

        <label htmlFor="improve">
          Will our 3D and AR features improve your shopping experience if we
          integrate it on an online e-commerce store ?
        </label>
        <input type="text" id="improve" placeholder="I would Like to say..." />
        <br />

        <label htmlFor="features">
          What are the other features that excite you to have them on
          RB-VisualStore ?
        </label>
        <input type="text" id="features" placeholder="I would Like to say..." />
        <br />

        <label htmlFor="comments">Any other comments?</label>
        <br />
        <textarea
          name="message"
          id="comments"
          placeholder="I would Like to say..."
          style={{ height: "200px" }}
        ></textarea>
        <br />
        <button type="button" className="btn" onClick={sendMail}>
          Send Reply
        </button>
      </form>
    </div>
  );
};

export default Feedback;
