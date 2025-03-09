import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.sass";

import Home from "./components/Home";
import Post from "./components/Post";
import Categories from "./components/Categories";
import Category from "./components/Category";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
