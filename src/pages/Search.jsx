import SearchBar from "../components/SearchBar.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Container } from "./Home.jsx";
import { BackBtn } from "./Detail.jsx";
import styled from "styled-components";
import MovieCard from "../components/MovieCard.jsx";

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
    justify-content: center;
`;

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;
        // eslint-disable-next-line
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then(json => setList(json.Search || []))
            .catch(err => {
                console.log(err);
                setList([]);
                setError("검색하는데 오류가 발생하였습니다.");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <div>
                <BackBtn
                    onClick={() => {
                        navigate("/");
                    }}>
                    {" "}
                    &larr; 홈으로
                </BackBtn>
                <div>
                    <h1>검색 키워드 : {keyword}</h1>
                    <SearchBar keyword={keyword} />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                <div></div>
            </div>
            <List>
                {Array.isArray(list)
                    ? list.map((item, index) => <MovieCard key={index} movie={item} />)
                    : "검색결과가 없습니다."}
            </List>
        </Container>
    );
}

export default Search;
