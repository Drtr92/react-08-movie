import SearchBar from "../components/SearchBar.jsx";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <h1>OMD Flicks</h1>
                <SearchBar keyword={""} />
            </div>
        </div>
    );
}

export default Home