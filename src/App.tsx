import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { searchApi } from "./api/search";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const SearchInput = styled.input`
  font-size: 20px;
  padding: 20px;
  border-radius: 50px;
  margin-right: 10px;
`;

const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--success);
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
`;

function App() {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await searchApi(text)
      .then((response) => {
        console.log(response);
        const data = response;
        if (data) {
          setSearchData(data);
          console.log("searchData : ", searchData);
        }
      })
      .catch((error) => {
        console.log("err : ", error);
      });
    console.log(searchData);
  };

  const onchange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <Main>
      <Header>
        <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
      </Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput type="text" value={text} onChange={onchange} />
        <SearchBtn type="submit">
          <FaSearch />
        </SearchBtn>
      </SearchForm>
    </Main>
  );
}

export default App;
