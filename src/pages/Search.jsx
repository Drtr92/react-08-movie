import SearchBar from "../components/SearchBar.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import styles from "./Search.module.css";

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const card = list.map((item, i) => {
        return (
            <Link key={i} to={`/detail/${item.imdbID}`} className={styles.cards}>
                {item.Poster ? (
                    <img className={styles.cardImg} src={item.Poster} alt={item.Title} />
                ) : (
                    <div className={styles.noImg}>"No image"</div>
                )}
                <div>{item.Title}</div>
                <div className={styles.cardDescriptions}>
                    <div>{item.Type}</div>
                    <div>{item.Year}</div>
                </div>
            </Link>
        );
    });

    useEffect(() => {
        if (!keyword) return;
        // eslint-disable-next-line
        setLoading(true);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then(json => setList(json.Search || []))
            .catch(err => console.log(err))
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
                    &larr; 뒤로가기
                </button>
                <div>
                    <h1>검색 키워드 : {keyword}</h1>
                    <SearchBar keyword={keyword} />
                </div>
                <div></div>
            </div>
            {loading ? (
                <div> LOADING ... </div>
            ) : list.length === 0 ? (
                <div> No results found for '{keyword}'. </div>
            ) : (
                <div className={styles.cardZone}>{card}</div>
            )}
        </div>
    );
}

export default Search;
