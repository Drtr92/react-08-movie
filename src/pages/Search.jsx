import SearchBar from "../components/SearchBar.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import styles from "./Search.module.css";

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const card = list.map((item, i) => {
        return (
            <Link key={i} to={`/detail/${item.imdbID}`} className={styles.cards}>
                {item.Poster ? (
                    <img className={styles.cardImg} src={item.Poster} alt={item.Title} />
                ) : (
                    <div className={styles.noImg}>"No image"</div>
                )}
                <div className={styles.cardTag}>
                    <div>{item.Title}</div>
                    <div className={styles.cardDescriptions}>
                        <div>{item.Type}</div>
                        <div>{item.Year}</div>
                    </div>
                </div>
            </Link>
        );
    });

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
        <div className={styles.container}>
            <div className={styles.header}>
                <button
                    className={styles.backButton}
                    onClick={() => {
                        navigate("/");
                    }}>
                    {" "}
                    &larr; 홈으로
                </button>
                <div className={styles.headerCen}>
                    <h1>검색 키워드 : {keyword}</h1>
                    <SearchBar keyword={keyword} />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                <div className={styles.dummy}></div>
            </div>
            <div className={styles.cardZone}>{card}</div>
        </div>
    );
}

export default Search;
