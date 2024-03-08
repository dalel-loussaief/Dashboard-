import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import User from "./layout/User";
import Agent from "./layout/Agent";
import FormAgent from "./layout/FormAgent";
import FormUser from "./layout/FormUser";
import Blog from "./layout/Blog";
import FormBlog from "./layout/FormBlog";
import BlogAdd from "./layout/BlogAdd";
import ListRDV from "./layout/ListRDV";
import Profil from "./layout/Profil";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/User" element={<User />} />
            <Route path="/Agent" element={<Agent />} />
            <Route path="/FormAgent/:id" element={<FormAgent />} />
            <Route path="/FormUser/:id" element={<FormUser />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/FormBlog/:id" element={<FormBlog />} />
            <Route path="/BlogAdd" element={<BlogAdd />} />
            <Route path="/ListRDV" element={<ListRDV />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
