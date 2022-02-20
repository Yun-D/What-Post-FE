import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "./Styles/theme";
import GlobalStyle from "./Styles/GlobalStyle";
import NavBar from "./Components/navigation/NavBar";
import Home from "./Components/Home/Home";
import MyPost from "./Components/MyPost/MyPost";
import SearchBook from "./Components/SearchBook/SearchBook";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <GlobalStyle />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search_book" element={<SearchBook />} />
            <Route path="/my_post" element={<MyPost />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
