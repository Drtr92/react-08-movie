import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Detail from "./pages/Detail.tsx";
import GlobalStyle from "./pages/GlobalStyle.ts";

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