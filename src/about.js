// About.js
import React from "react";
import "./App.css"; // Import the CSS file for the About component
import backgroundImg from "./image.avif"; // Replace with your image path
 // Replace with Aryan's photo path
import aryanPhoto from "./aryan.JPG";
import militPhoto from "./milit.jpeg"; // Replace with Milit's photo path
import nirajanPhoto from "./nirajan.jpeg"; // Replace with Nirajan's photo path

const About = () => {
  return (
    <div className="about-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="overlay"></div>
      <div className="content">
        <h1 className="about-heading">News API</h1>
        <div className="project-description">
          <h2>Project Description</h2>
          <p>
            Welcome to the News API project! This initiative is part of our UI/UX Lab, where we aim to create a
            user-friendly platform for accessing and staying informed about news articles across various categories.
          </p>
        </div>
        <div className="developers-section">
          <h3>About the Developers</h3>
          <p>
            We, Aryan Bharti, Nirajan Chaudhary, and Milit Lakshman, are passionate developers working on this project
            as part of our UI/UX Lab. Our goal is to enhance the user experience and deliver a visually appealing news portal.
          </p>
        </div>
        <div className="photos-section">
          <img src={militPhoto} alt="Milit Lakshman" className="developer-photo" />
          <img src={nirajanPhoto} alt="Nirajan Chaudhary" className="developer-photo" />
          <img src={aryanPhoto} alt="Nirajan Chaudhary" className="developer-photo" />
        </div>
      </div>
    </div>
  );
};

export default About;
