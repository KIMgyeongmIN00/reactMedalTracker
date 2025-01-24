import React, { useState } from "react";
import Content from "./components/Content";
import ListCountry from "./components/ListCountry";
import Radio from "./components/Radio";
import "./App.css";

const LOCAL_STORAGE = "olympicEntryCountries";
const HISTORY_STORAGE = "olympicHistory";
const CURRENT_INDEX_STORAGE = "olympicCurrentIndex";

const App = () => {
  // 데이터 로드
  const loadCountries = () => {
    const saveCountriesOnLocalStorage = localStorage.getItem(LOCAL_STORAGE);
    return saveCountriesOnLocalStorage
      ? JSON.parse(saveCountriesOnLocalStorage)
      : [];
  };

  // undo를 위한 상태 관리
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE);
    return savedHistory ? JSON.parse(savedHistory) : [loadCountries()];
  });
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem(CURRENT_INDEX_STORAGE);
    return savedIndex ? parseInt(savedIndex) : 0;
  });

  // 국가 배열 및 정렬 기준 상태 관리
  const [countries, setCountries] = useState(loadCountries());
  const [sortBy, setSortBy] = useState({
    gold: true,
    silver: false,
    bronze: false,
    total: false,
  });

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (type) => {
    setSortBy((prev) => {
      switch (type) {
        case "gold":
          return {
            gold: !prev.gold,
            silver: false,
            bronze: false,
            total: false,
          };
        case "silver":
          return {
            gold: false,
            silver: !prev.silver,
            bronze: false,
            total: false,
          };
        case "bronze":
          return {
            gold: false,
            silver: false,
            bronze: !prev.bronze,
            total: false,
          };
        case "total":
          return {
            gold: false,
            silver: false,
            bronze: false,
            total: !prev.total,
          };
        default:
          return prev;
      }
    });
  };

  // 로컬스토리지 업데이트
  const updateLocalStorage = (newCountry) => {
    const newHistory = history.slice(0, currentIndex + 1); // 현재 인덱스 이후 이력 제거

    // 새 history 추가
    newHistory.push(newCountry);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setCountries(newCountry);

    // 로컬 스토리지에 저장
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(newCountry));
    localStorage.setItem(HISTORY_STORAGE, JSON.stringify(newHistory));
    localStorage.setItem(CURRENT_INDEX_STORAGE, currentIndex + 1);
  };

  // undo 기능
  const handleUndo = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCountries(history[prevIndex]);

      // 로컬 스토리지 업데이트
      localStorage.setItem(CURRENT_INDEX_STORAGE, prevIndex);
    }
  };

  // history 초기화 기능
  const handleResetHistory = () => {
    setHistory([]); // history 배열 초기화
    setCurrentIndex(0); // currentIndex 초기화
    setCountries([]); // countries 배열 초기화

    // 로컬 스토리지에서 관련 데이터 삭제
    localStorage.removeItem(HISTORY_STORAGE);
    localStorage.removeItem(CURRENT_INDEX_STORAGE);
    localStorage.removeItem(LOCAL_STORAGE);
  };

  return (
    <>
      <h1>2024 파리 올림픽 메달 기록</h1>
      <div className="button-group">
        <button onClick={handleUndo} disabled={history.length === 0}>
          UNDO
        </button>
        <button onClick={handleResetHistory} disabled={history.length === 0}>
          초기화
        </button>
      </div>
      <Radio sortBy={sortBy} handleCheckboxChange={handleCheckboxChange} />
      <Content countries={countries} updateLocalStorage={updateLocalStorage} />
      <ListCountry
        countries={countries}
        updateLocalStorage={updateLocalStorage}
        sortBy={sortBy}
      />
    </>
  );
};

export default App;
