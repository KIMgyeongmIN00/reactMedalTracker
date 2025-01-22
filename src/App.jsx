import React, { useState } from "react";

const App = () => {
  return (
    <>
      <Title />
      <Content />
    </>
  );
};

const Title = () => {
  const titleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <h1 style={titleStyle}>2024 파리 올림픽 메달 기록</h1>;
};

const Content = () => {
  const [countryName, setCountryName] = useState("");
  const [countGoldMedal, setCountGoldMedal] = useState(0); // state묶어보기
  const [countSilverMedal, setCountSilverMedal] = useState(0); // state묶어보기
  const [countBronzeMedal, setCountBronzeMedal] = useState(0); // state묶어보기
  const [countries, setCountries] = useState([]);

  const findCountryByName = (name) => {
    return countries.find((country) => country.countryName === name);
  };

  // 국가 등록 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //중복 검사
    const isCountryFound = findCountryByName(countryName);

    // 유효성 검사
    if (!countryName.trim()) {
      alert("국가 이름을 입력해주세요.");
      return;
    }

    if (isCountryFound) {
      alert("이미 존재하는 국가입니다.");
      return;
    }

    const newCountry = {
      id: new Date().getTime(),
      countryName: countryName,
      goldMedal: countGoldMedal,
      silverMedal: countSilverMedal,
      bronzeMedal: countBronzeMedal,
    };

    setCountries([...countries, newCountry]);

    // 인풋 내부 초기화
    setCountryName("");
    setCountGoldMedal(0);
    setCountSilverMedal(0);
    setCountBronzeMedal(0);
  };

  // 국가 업데이트 핸들러
  const handleUpdate = (e) => {
    e.preventDefault();

    //일치자 찾기
    const isCountryFound = findCountryByName(countryName);

    if (isCountryFound) {
      // 국가가 존재하면 업데이트
      const updatedCountries = countries.map((country) => {
        if (country.countryName === countryName) {
          return {
            ...country,
            goldMedal: countGoldMedal,
            silverMedal: countSilverMedal,
            bronzeMedal: countBronzeMedal,
          };
        }
        return country;
      });

      // 업데이트된 배열로 상태 업데이트
      setCountries(updatedCountries);

      // 입력 필드 초기화
      setCountryName("");
      setCountGoldMedal(0);
      setCountSilverMedal(0);
      setCountBronzeMedal(0);

      alert(`${countryName} 메달\ 데이터를 업데이트했습니다.`);
    } else {
      // 국가가 존재하지 않으면 경고 메시지
      alert(`${countryName}에 해당하는 국가가 없습니다!`);
    }
  };

  // 국가 삭제 핸들러
  const handleDelete = (id) => {
    // 삭제할 국가 찾기
    const countryToDelete = countries.find((country) => country.id === id);

    // 국가 삭제
    const deletedCountries = countries.filter((country) => country.id !== id);
    setCountries(deletedCountries);

    // 삭제된 국가 이름을 알림창에 표시
    alert(`${countryToDelete.countryName} 국가를 삭제했습니다.`);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <CountryInput
          countryName={countryName}
          setCountryName={setCountryName}
        />
        <MedalInput
          medalType="금메달"
          value={countGoldMedal}
          onChange={setCountGoldMedal}
        />
        <MedalInput
          medalType="은메달"
          value={countSilverMedal}
          onChange={setCountSilverMedal}
        />
        <MedalInput
          medalType="동메달"
          value={countBronzeMedal}
          onChange={setCountBronzeMedal}
        />
        <Buttons
          handleFormSubmit={handleFormSubmit}
          handleUpdate={handleUpdate}
        />
      </form>
      <ListCountry countries={countries} handleDelete={handleDelete} />
    </>
  );
};

const CountryInput = ({ countryName, setCountryName }) => {
  return (
    <>
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="국가"
      />
    </>
  );
};

const Buttons = ({ handleUpdate }) => {
  return (
    <>
      <button type="submit">국가 등록하기</button>
      <button type="button" onClick={handleUpdate}>
        업데이트
      </button>
    </>
  );
};

const MedalInput = ({ medalType, value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={medalType}
      min="0"
    />
  );
};

const ListCountry = ({ countries, handleDelete }) => {
  return (
    <ul>
      {countries
        .sort((a, b) => {
          if (b.goldMedal !== a.goldMedal) return b.goldMedal - a.goldMedal;
          if (b.silverMedal !== a.silverMedal)
            return b.silverMedal - a.silverMedal;
          return b.bronzeMedal - a.bronzeMedal;
        })
        .map((country) => {
          return (
            <li key={country.id}>
              <CountryName name={country.countryName} /> -{" "}
              <MedalQuantity country={country} />
              <button onClick={() => handleDelete(country.id)}>삭제</button>
            </li>
          );
        })}
    </ul>
  );
};

const CountryName = ({ name }) => {
  return <>{name}</>;
};

const MedalQuantity = ({ country }) => {
  return (
    <>
      금메달:{country.goldMedal}개, 은메달:{country.silverMedal}개, 동메달:
      {country.bronzeMedal}개
    </>
  );
};

export default App;
