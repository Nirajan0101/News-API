import React, { useEffect, useState, useCallback } from "react";
import NewsItem2 from "./NewsItem2";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import lightModeLogo from "./light.ico";
import darkModeLogo from "./dark.ico";
import "./App.css";

const apiKey = "02342953e35a47d6890a8a827062b83b"; // Updated API key

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or default to false
    return localStorage.getItem('darkMode') === 'true';
  });

  const capitaliseStr = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `News - ${capitaliseStr(props.category)}`;

  const updateNews = useCallback(async () => {
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const parsedData = await response.json();

      if (parsedData && parsedData.articles) {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
      } else {
        console.error('API response structure is unexpected:', parsedData);
      }
    } catch (error) {
      console.error('Error updating news:', error);
    } finally {
      setLoading(false);
    }
  }, [page, props.country, props.category, props.pageSize]);

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const parsedData = await response.json();

      if (parsedData && parsedData.articles) {
        setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
      } else {
        console.error('API response structure is unexpected:', parsedData);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
  }, [updateNews, props.country, props.category, props.pageSize]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Save dark mode preference to localStorage
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <>
      <div className={`blurred-background ${isDarkMode ? "dark-mode" : ""}`} />
      <div className={`page-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div>
          <center>
            <h1 style={{ marginTop: "70px", color: isDarkMode ? "#fff" : "#000" }}>
              News Headlines | {capitaliseStr(props.category)} Category
            </h1>
          </center>
        </div>
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          <img
            src={isDarkMode ? lightModeLogo : darkModeLogo}
            alt={isDarkMode ? "Light Mode" : "Dark Mode"}
          />
        </div>
        {loading && <Spinner />}
        <div className={`album py-3 ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {articles.map((element) => (
                  <div className="col" key={element.url}>
                    <NewsItem2
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newUrl={element.url}
                      publisher={element.source.name}
                      isDarkMode={isDarkMode} // Pass isDarkMode to NewsItem2
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 12,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
