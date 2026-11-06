import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";
import GlobalStyle from "./pages/GlobalStyle.js";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/Search"} element={<Search />} />
                    <Route path={`/Detail/:id`} element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;