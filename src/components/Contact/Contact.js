import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="err-container">
      <h1>Let's Connect and Revolutionize E-commerce</h1>
      <h2>
        Reach out to Project Admin at{" "}
        <Link
          to="https://github.com/RUBAL-cyber"
          target="_blank"
        >
          LinkedIn
        </Link>{" "}
        and{" "}
        <Link to="mailto:RUBAL@gmail.com" target="_blank">
          RUBAL@gmail.com
        </Link>
      </h2>
    </div>
  );
};

export default Contact;
