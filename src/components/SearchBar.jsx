import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #ff5959;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

function SearchBar({ keyword }) {
    const [input, setInput] = useState(keyword || "");
    const navigate = useNavigate();

    const handleChange = e => setInput(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        const k = input.trim();
        if (!k) return;
        // 영문, 숫자, 공백, 일부 기본 특수문자(-, :, ')만 허용하는 정규식
        const isValidKeyword = /^[a-zA-Z0-9\s\-:']+$/.test(k);

        if (!isValidKeyword) {
            alert("영화 제목은 영문으로만 검색해 주세요! (예: Batman, Parasite)");
            return;
        }
        navigate(`/Search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                onChange={handleChange}
                value={input}
                placeholder={"Search movies..."}
                autoComplete={"off"}
                spellCheck={false}
            />
            <Button type={"submit"}>Search</Button>
        </Form>
    );
}

export default SearchBar;
