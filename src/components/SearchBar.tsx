import { type ChangeEvent, type SubmitEvent, useState } from "react";
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

/*
  Props의 타입을 지정해주기 위한 방법

  2. 내부 코드 진행 상 input 태그의 값으로 input이라는 state가 존재하고
     그러므로 input state는 string 타입이어야 하고
     그에 대한 초기값인 keyword는 당연히 string 타입이어야 하는구나
*/

function SearchBar( { keyword }:{ keyword : string } ) {
    const [input, setInput] = useState(keyword || "");
    const navigate = useNavigate();

    const handleChange = (e:ChangeEvent<HTMLInputElement, HTMLInputElement>) => setInput(e.target.value);
    const handleSubmit = (e:SubmitEvent<HTMLFormElement>) => {
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
