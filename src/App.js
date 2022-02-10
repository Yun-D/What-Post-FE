import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./Components/navigation/NavBar";
import Home from "./Components/Home/Home";
import MyPost from "./Components/MyPost/MyPost";
import SearchBook from "./Components/SearchBook/SearchBook";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/my_post" element={<MyPost />} />
          <Route path="/search_book" element={<SearchBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
