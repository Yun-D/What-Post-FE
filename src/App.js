import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./Styles/theme";
import GlobalStyle from "./Styles/GlobalStyle";
import NavBar from "./Components/navigation/NavBar";
import Footer from "./Components/layout/Footer";
import Home from "./Pages/Home/Home";
import MyPost from "./Pages/MyPost/MyPost";
import WritePost from "./Pages/MyPost/WritePost/WritePost";
import BookMain from "./Pages/SearchBook/BookMain";
import SearchBook from "./Pages/SearchBook/SearchBook";
import BookDetail from "./Pages/SearchBook/BookDetail";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import MovieMain from "Pages/SearchMovie/MovieMain";
import SearchMovie from "./Pages/SearchMovie/SearchMovie";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <BrowserRouter>
          <NavBar />

          <div className="wrapper">
            <Routes>
              <Route path="/*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
              <Route path="/" exact element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search_book" element={<BookMain />} />
              <Route
                path="/search_book/search/:query"
                element={<SearchBook />}
              />
              <Route path="/search_book/info" element={<BookDetail />} />
              <Route path="/search_movie" element={<MovieMain />} />
              <Route
                path="/search_movie/search/:query"
                element={<SearchMovie />}
              />
              <Route path="/my_post" element={<MyPost />} />
              <Route path="/my_post/write_post" element={<WritePost />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
