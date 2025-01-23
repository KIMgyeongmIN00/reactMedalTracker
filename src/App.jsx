import React, { useState } from "react";
import Title from "./components/Title";
import Content from "./components/Content";
import ListCountry from "./components/ListCountry";

const App = () => {
  const [countries, setCountries] = useState([]);

  // 국가 삭제 핸들러
  const handleDelete = (id) => {
    // 국가 삭제
    const deletedCountries = countries.filter((country) => country.id !== id);
    setCountries(deletedCountries);

    // 삭제할 국가 찾고
    const countryToDelete = countries.find((country) => country.id === id);

    // 삭제된 국가 이름을 알림창에 표시
    alert(`${countryToDelete.countryName} 국가를 삭제했습니다.`);
  };

  return (
    <>
      <Title />
      <Content countries={countries} setCountries={setCountries} />
      <ListCountry countries={countries} handleDelete={handleDelete} />
    </>
  );
};

export default App;
