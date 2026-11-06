import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";

function Detail() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [detailDescription, setDetailDescription] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setDetailDescription(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!detailDescription) return;

    return (
        <div>
            <button
                onClick={() => {
                    navigate(-1);
                }}>
                {" "}
                &larr; 뒤로가기
            </button>
            <SearchBar keyword={""} />
            {detailDescription.Poster ? (
                <img src={detailDescription.Poster} alt={detailDescription.Title} />
            ) : (
                <div>"No image"</div>
            )}
            <div>{detailDescription.Title}</div>
            <div>{detailDescription?.Year}</div>
            <div>{detailDescription?.Released}</div>
            <div>{detailDescription?.Genre}</div>
            <div>{detailDescription?.Director}</div>
            <div>{detailDescription?.Plot}</div>
        </div>
    );
}

export default Detail;
