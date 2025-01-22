import React, { useState } from "react";

const App = () => {
  return (
    <>
      <Title />
      <InputForm />
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

const InputForm = () => {
  const [countryName, setCountryName] = useState("");
  const [countGoldMedal, setCountGoldMedal] = useState(0);
  const [countSilverMedal, setCountSilverMedal] = useState(0);
  const [countBronzeMedal, setCountBronzeMedal] = useState(0);
  const [countries, setCountries] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
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

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
          }}
          placeholder="국가"
        />
        <input
          type="number"
          value={countGoldMedal}
          onChange={(e) => {
            setCountGoldMedal(Number(e.target.value));
          }}
          placeholder="금메달"
        />
        <input
          type="number"
          value={countSilverMedal}
          onChange={(e) => {
            setCountSilverMedal(Number(e.target.value));
          }}
          placeholder="은메달"
        />
        <input
          type="number"
          value={countBronzeMedal}
          onChange={(e) => {
            setCountBronzeMedal(Number(e.target.value));
          }}
          placeholder="동메달"
        />
        <button type="submit">국가 등록하기</button>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ListCountry countries={countries} />
      </div>
    </>
  );
};

const ListCountry = ({ countries }) => {
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
              {country.countryName} - <MedalQuantity country={country} />
            </li>
          );
        })}
    </ul>
  );
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
