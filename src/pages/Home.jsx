import SearchBar from "../components/SearchBar.jsx";

function Home() {
    return (
        <div>
            <h1>OMD Flicks</h1>
            <SearchBar keyword={""} />
        </div>
    );
}

export default Home