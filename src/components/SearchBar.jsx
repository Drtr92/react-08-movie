import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./SearchBar.module.css"

function SearchBar({keyword}) {
    const [input, setInput] = useState(keyword || "")
    const navigate = useNavigate()

    const handleChange = (e) => setInput(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/Search?keyword=${encodeURIComponent(k)}`);
    }

    return (
        <form  className={styles.form} onSubmit={handleSubmit}>
            <input className={styles.input} onChange={handleChange} value={input} />
            <button className={styles.button} type={"submit"}>Search</button>
        </form>
    )
}

export default SearchBar;