import React, { useState } from "react";
import Content from "./components/Content";
import ListCountry from "./components/ListCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const LOCAL_STORAGE = "olympicEntryCountries";

  return (
    <>
      <h1>2024 파리 올림픽 메달 기록</h1>
      <Content countries={countries} setCountries={setCountries} />
      <ListCountry countries={countries} setCountries={setCountries} />
    </>
  );
};

export default App;
