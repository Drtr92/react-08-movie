import SearchBar from "../components/SearchBar.jsx";
import styled from "styled-components";

// eslint-disable-next-line
export const Container = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

function Home() {
    return (
        <Container>
            <div>
                <h1>OMD Flicks</h1>
                <SearchBar keyword={""} />
            </div>
        </Container>
    );
}

export default Home;
