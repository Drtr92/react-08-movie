import { useState } from "react";
import { useNavigate } from "react-router";

function SearchBar() {
    const [input, setInput] = useState("")
    const navigate = useNavigate()

    return (
        <form  onSubmit={}>
            <input />
            <button type={"submit"}>Search</button>
        </form>
    )
}

export default SearchBar;