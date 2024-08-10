import React, { useState } from "react";
import CommentSection from "./CommentSection";

const NewsItem2 = (props) => {
  const { title, description, imageUrl, newUrl, publisher, isDarkMode } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to open Twitter sharing window
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(newUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  // Function to open Facebook sharing window
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className={`card shadow-sm news-item ${isDarkMode ? "dark-mode" : ""}`}>
      <img
        src={!imageUrl ? "./news.jpg" : imageUrl}
        className="card-img-top"
        alt="News"
        loading="lazy"
      />
      <div className={`card-body ${isDarkMode ? "text-light" : ""}`}>
        <h5 className="card-title">
          {title ? title.slice(0, 50) : ""}
        </h5>
        <p className="card-text">
          {description
            ? isExpanded
              ? description
              : `${description.slice(0, 100)}...`
            : ""}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <a href={newUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            View
          </a>
          {description && (
            <button className="btn btn-secondary" onClick={toggleDescription}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
          <small className="text-muted">By {publisher}</small>
        </div>
        <div className="social-buttons mt-2">
          {/* Twitter sharing button */}
          <button className="btn btn-social btn-twitter" onClick={shareOnTwitter}>
            Share on Twitter
          </button>
          {/* Facebook sharing button */}
          <button className="btn btn-social btn-facebook" onClick={shareOnFacebook}>
            Share on Facebook
          </button>
        </div>
      </div>
      <div className={`comment-section-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <CommentSection />
      </div>
    </div>
  );
};

export default NewsItem2;
