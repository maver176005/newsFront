import React from "react";
import style from "./App.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ArticleEditor from "./components/ArticleEditor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState(null);

  // Функция для проверки авторизации пользователя
  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  };

  // Проверяем авторизацию при первом рендере компонента
  React.useEffect(() => {
    checkAuth();
  }, []);

  // Функция для обновления авторизации пользователя
  const updateAuth = (loggedIn, newToken) => {
    setIsLoggedIn(loggedIn);
    setToken(newToken);
    if (!loggedIn) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", newToken);
    }
  };

  return (
    <Router>
      <div className={style["container"]}>
        <Header isLoggedIn={isLoggedIn} updateAuth={updateAuth} />
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home token={token} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login updateAuth={updateAuth} />
            )}
          </Route>
          <Route path="/register">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register updateAuth={updateAuth} />
            )}
          </Route>
          <Route path="/news">
            {isLoggedIn ? (
              <ArticleEditor token={token} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
