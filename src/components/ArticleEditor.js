import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleEditor = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/news",
        { title: title, content: content },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (submitted) {
    return (
      <>
        <h1>Новость успешно добавлена!</h1>
        <Link to="/">На главную</Link>
      </>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content:
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArticleEditor;
