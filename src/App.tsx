import React, { useState, useEffect, useRef } from "react";
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
  width: 480px;
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
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  &:hover {
    opacity: 0.8;
  }
`;

const SuggestionSearch = styled.ul`
  width: 480px;
  font-size: 17px;
  border-radius: 20px;
  background-color: white;
  margin-top: 10px;
  margin-right: 50px;
  padding: 10px 0px;
  div:first-child {
    padding: 15px;
  }
  div:nth-child(2) {
    padding: 15px;
  }
  span {
    margin-right: 10px;
  }
`;
const SearchItem = styled.li<{ isFocus?: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.isFocus ? "#ededed" : "#fff")};
  &:hover {
    background-color: var(--gray-300);
  }
`;

interface IsearchData {
  sickCd: string;
  sickNm: string;
}

function App() {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState<IsearchData[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isAutoSearch, setIsAutoSearch] = useState(false);
  const [autoSearchKeyword, setAutoSearchKeyword] = useState("");
  const [index, setIndex] = useState(-1);
  const autoRef = useRef<HTMLUListElement>(null);
  const debounceText = useDebounce(text, 800);

  const ArrowDown = "ArrowDown";
  const ArrowUp = "ArrowUp";
  const Escape = "Escape";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(`https://clinicaltrialskorea.com/studies?conditions=${text}`);
  };

  const onchange = async (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setAutoSearchKeyword(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ArrowDown:
        if (searchData.length === 0) {
          return;
        }
        setIndex(index + 1);
        // if (autoRef.current?.childElementCount === index + 1) {
        //   setIndex(0);
        // }
        setAutoSearchKeyword(searchData[index + 1].sickNm);
        if (index >= 0) {
          setIsAutoSearch(true);
        }

        break;
      case ArrowUp:
        if (searchData.length === 0) {
          return;
        }
        setIndex(index - 1);
        if (index <= 0) {
          setIndex(-1);
        }
        if (index === -1) {
          setIsAutoSearch(false);
        }
        setAutoSearchKeyword(searchData[index - 1].sickNm);
        break;
      case Escape:
        setIndex(-1);
        // setIsAutoSearch(false);
        break;
    }
  };

  useEffect(() => {
    (async () => {
      if (debounceText.trim()) {
        await searchApi(debounceText)
          .then((response) => {
            console.log("api 호출");
            const data = response;
            if (data) {
              setSearchData(data.slice(0, 10));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setSearchData([]);
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
          value={isAutoSearch ? autoSearchKeyword : text}
          onChange={onchange}
          onFocus={() => setIsSearched(true)}
          onBlur={() => setIsSearched(false)}
          onKeyDown={onKeyDown}
          placeholder="질환명을 입력해 주세요."
        />
        <SearchBtn type="submit">
          <FaSearch />
        </SearchBtn>
      </SearchForm>
      {isSearched ? (
        <SuggestionSearch ref={autoRef}>
          <div>추천 검색어</div>
          {!text && (
            <div>
              <span>
                <FaSearch />
              </span>
              <span>검색어 없음</span>
            </div>
          )}
          {searchData && (
            <div>
              {searchData.map((data: any, idx) => (
                <SearchItem
                  isFocus={index === idx ? true : false}
                  key={data.sickCd}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setText(data.sickNm);
                  }}
                >
                  <span>
                    <FaSearch />
                  </span>
                  <span>
                    {data.sickNm.split(text)[0]}
                    <strong>{text}</strong>
                    {data.sickNm.split(text)[1]}
                  </span>
                </SearchItem>
              ))}
            </div>
          )}
        </SuggestionSearch>
      ) : null}
    </Main>
  );
}

export default App;
