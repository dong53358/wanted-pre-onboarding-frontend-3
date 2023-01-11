import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { searchApi } from "./api/search";
import { useDebounce } from "./hooks/useDebounce";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #cae9ff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  margin: 40px 0px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const SearchInput = styled.input`
  width: 490px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  padding: 20px 20px 15px 20px;
  border: none;
  border-radius: 50px;
  margin-right: 10px;
  line-height: 60px;
  &:focus::placeholder {
    opacity: 0;
  }
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

const SuggestionSearch = styled.div`
  width: 450px;
  font-size: 17px;
  padding: 25px;
  border-radius: 20px;
  background-color: white;
  margin-top: 10px;
  margin-right: 50px;
  span {
    margin-right: 10px;
  }
  div {
    margin-bottom: 15px;
  }
`;

function App() {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const debounceText = useDebounce(text, 800);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onchange = async (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  useEffect(() => {
    (async () => {
      if (debounceText.trim()) {
        await searchApi(debounceText)
          .then((response) => {
            console.log("api 호출");
            const data = response;
            if (data) {
              setSearchData(data);
              setIsSearched(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, [debounceText]);

  return (
    <Main>
      <Header>
        <div>국내 모든 임상시험 검색하고</div>
        <div>온라인으로 참여하기</div>
      </Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchInput
          type="search"
          name="p"
          value={text}
          onChange={onchange}
          onFocus={() => setIsSearched(true)}
          onBlur={() => setIsSearched(false)}
          placeholder="질환명을 입력해 주세요."
        />
        <SearchBtn type="submit">
          <FaSearch />
        </SearchBtn>
      </SearchForm>
      {!isSearched ? null : (
        <SuggestionSearch>
          {searchData.map((data: any) => (
            <div key={data.sickCd}>
              <span>
                <FaSearch />
              </span>
              <span>{data.sickNm}</span>
            </div>
          ))}
        </SuggestionSearch>
      )}
    </Main>
  );
}

export default App;
