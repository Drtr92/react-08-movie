import SearchBar from "../components/SearchBar.jsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;
        // eslint-disable-next-line
        setLoading(true);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
        .then(res => res.json())
        .then(json => setList(json.Search))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    },[keyword])


    return (
        <div>
            <h1>검색 키워드 : {keyword}</h1>
            <SearchBar keyword={keyword}/>
            {loading ? (
                <div> LOADING ... </div>
            ) : (list.length === 0 ? (
                <div> No results found for '{keyword}'. </div>
                ) : (
                    list.map((item, i) => {
                        return (
                            <Link key={i} to={`/detail/${item.imdbID}`}>
                                {item.Poster ? (
                                    <img src={item.Poster} alt={item.Title} />
                                ) : (
                                    <div>"No image"</div>
                                )}
                                <div>
                                    <div>{item.Title}</div>
                                    <div>{item.Type}</div>
                                    <div>{item.Year}</div>
                                </div>
                            </Link>
                        );
                        })
                )
            )}
        </div>
    )
}

export default Search