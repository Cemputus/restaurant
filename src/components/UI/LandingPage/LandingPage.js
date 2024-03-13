import React from "react";
import ReactFontFace from "react-font-face";
import { Link } from "react-router-dom";

import classes from "./LandingPage.css";
import { fontSecondary } from "../../../assets/font/font";

// LandingPage component
const LandingPage = () => {
  return (
    <div className={classes.LandingPage}>
      {/* Stylish button for admin login */}
      <Link
        to="/login"
        className={`btn-small orange lighten-2 ${classes.AdmBtn}`}
      >
        <i className="material-icons">lock</i>
      </Link>
      {/* Brand name: Sweet Burger O'Mine */}
      <span>sweet</span>
      <span className={classes.BurgerTitle}>Burger</span>
      <span>o'mine</span>
      {/* Slogan: Burgers N' Snacks */}
      <p>Burgers N' Snacks</p>
      {/* Button to enter the menu */}
      <div className={classes.LPBtns}>
        <Link
          to="/menu"
          className="btn-large waves-effect waves-light orange lighten-2"
        >
          Enter
        </Link>
      </div>
    </div>
  );
};

// Applying the secondary font using ReactFontFace
export default ReactFontFace(LandingPage, fontSecondary);
