import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import styles from "./Detail.module.css";

function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [detailDescription, setDetailDescription] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setDetailDescription(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!detailDescription) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button
                    className={styles.backButton}
                    onClick={() => {
                        navigate(-1);
                    }}>
                    &larr; 뒤로가기
                </button>
                <SearchBar keyword={""} />
                <div className={styles.dummy}></div>
            </div>
            {detailDescription.Poster ? (
                <img src={detailDescription.Poster} alt={detailDescription.Title} />
            ) : (
                <div>"No image"</div>
            )}
            <div>{detailDescription.Title}</div>
            <div>
                <strong>Year</strong>
                {detailDescription?.Year}
            </div>
            <div>
                <strong>Released</strong>
                {detailDescription?.Released}
            </div>
            <div>
                <strong>Genre</strong>
                {detailDescription?.Genre}
            </div>
            <div>
                <strong>Director</strong>
                {detailDescription?.Director}
            </div>
            <div>
                <strong>Plot</strong>
                {detailDescription?.Plot}
            </div>
        </div>
    );
}

export default Detail;
