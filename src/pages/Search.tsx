import SearchBar from "../components/SearchBar.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Container } from "./Home.tsx";
import { BackBtn } from "./Detail.tsx";
import styled from "styled-components";
import MovieCard from "../components/MovieCard.tsx";

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
    justify-content: center;
`;

type ApiResponse = {
    Search?: MovieList[];
};

export type MovieList = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const navigate = useNavigate();

    const [list, setList] = useState<MovieList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;
        // eslint-disable-next-line
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.Search || []))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                    setList([]);
                    setError("검색하는데 오류가 발생하였습니다.");
                } else {
                    console.log(err);
                    setList([]);
                    setError("검색하는데 오류가 발생하였습니다.");
                }
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
                    <SearchBar keyword={keyword || ""} />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                <div></div>
            </div>
            <List>
                {/*
                    화면부에서 array에 map을 돌렸을 때, 리턴되는 최상단 태그에는
                    반복적으로 화면을 출력하기 때문에 리액트 엔진이 알아볼 수 있도록
                    일련번호를 붙여서 리턴 시켰어야 함
                    그 속성이 key 이고, 그 속성값은 반복 요소들 중 유일한 값을 가졌어야 함
                    이러한 이유로 key 속성이 있기 때문에 Props로 전달되진 않음
                */}
                {list.length > 0
                    ? list.map((item, index) => <MovieCard key={index} movie={item} />)
                    : "검색결과가 없습니다."}
            </List>
        </Container>
    );
}

export default Search;
