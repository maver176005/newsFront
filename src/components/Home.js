import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const result = await axios("http://localhost:3000/api/news");
      setNews(result.data);
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      <h1> News</h1>
      <ul>
        {news.map((article) => (
          <li key={article._id}>
            <Link to={`/news/${article._id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
