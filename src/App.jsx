import React, { useState } from "react";
import Content from "./components/Content";
import ListCountry from "./components/ListCountry";

const App = () => {
  const LOCAL_STORAGE = "olympicEntryCountries";
  const loadCountries = () => {
    const saveCountriesOnLocalStorage = localStorage.getItem(LOCAL_STORAGE);
    return saveCountriesOnLocalStorage
      ? JSON.parse(saveCountriesOnLocalStorage)
      : [];
  };

  const [countries, setCountries] = useState(loadCountries());

  const updateLocalStorage = (newCountry) => {
    setCountries(newCountry);
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(newCountry));
  };

  return (
    <>
      <h1>2024 파리 올림픽 메달 기록</h1>
      <Content countries={countries} updateLocalStorage={updateLocalStorage} />
      <ListCountry
        countries={countries}
        updateLocalStorage={updateLocalStorage}
      />
    </>
  );
};

export default App;
