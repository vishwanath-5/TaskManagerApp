import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-3 text-center">
        <p className="mb-1">
          {" "}
          © {new Date().getFullYear()}
          Task Manager{" "}
        </p>{" "}
        <p className="mb-0"> Made with Love using MERN Stack </p>{" "}
      </div>{" "}
    </footer>
  );
}

export default Footer;
