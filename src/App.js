// App.js
import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from "./News";
import About from "./about"; // Import the About component

const App = () => {
  const apikey = process.env.REACT_APP_API_KEY;

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News key="general" apikey={apikey} pageSize={12} category="general" country="in" />} />
          <Route exact path="/general" element={<News key="general" apikey={apikey} pageSize={12} category="general" country="in" />} />
          <Route exact path="/business" element={<News key="business" apikey={apikey} pageSize={12} category="business" country="in" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" apikey={apikey} pageSize={12} category="entertainment" country="in" />} />
          <Route exact path="/sports" element={<News key="sports" apikey={apikey} pageSize={12} category="sports" country="in" />} />
          <Route exact path="/health" element={<News key="health" apikey={apikey} pageSize={12} category="health" country="in" />} />
          <Route exact path="/science" element={<News key="science" apikey={apikey} pageSize={12} category="science" country="in" />} />
          <Route exact path="/technology" element={<News key="technology" apikey={apikey} pageSize={12} category="technology" country="in" />} />
          <Route exact path="/about" element={<About />} /> {/* Add this line for the About route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
