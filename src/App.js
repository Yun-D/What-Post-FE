import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./Styles/theme";
import GlobalStyle from "./Styles/GlobalStyle";
import NavBar from "./Components/navigation/NavBar";
import Home from "./Pages/Home/Home";
import MyPost from "./Pages/MyPost/MyPost";
import WritePost from "./Pages/MyPost/WritePost/WritePost";
import BookMain from "./Pages/SearchBook/BookMain";
import SearchBook from "./Pages/SearchBook/SearchBook";
import Login from "./Pages/Auth/Login/Login";
import SignUp from "./Pages/Auth/SignUp/SignUp";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search_book" element={<BookMain />} />
            <Route path="/search_book/search" element={<SearchBook />} />
            <Route path="/my_post" element={<MyPost />} />
            <Route path="/my_post/write_post" element={<WritePost />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
