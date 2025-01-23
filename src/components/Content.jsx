import CountryInput from "./CountryInput";
import MedalInput from "./MedalInput";
import Buttons from "./Buttons";
import ListCountry from "./ListCountry";
import { useState } from "react";

const Content = () => {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [medals, setMedals] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
  });

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
      goldMedal: medals.gold,
      silverMedal: medals.silver,
      bronzeMedal: medals.bronze,
    };

    setCountries([...countries, newCountry]);

    // 인풋 내부 초기화
    setCountryName("");
    setMedals({ gold: 0, silver: 0, bronze: 0 });
  };

  // 국가 업데이트 핸들러
  const handleUpdate = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!countryName.trim()) {
      alert("국가 이름을 입력해주세요.");
      return;
    }

    //일치자 찾기
    const isCountryFound = findCountryByName(countryName);

    if (isCountryFound) {
      // 국가가 존재하면 업데이트
      const updatedCountries = countries.map((country) => {
        if (country.countryName === countryName) {
          return {
            ...country,
            goldMedal: medals.gold,
            silverMedal: medals.silver,
            bronzeMedal: medals.bronze,
          };
        }
        return country;
      });

      // 업데이트된 배열로 상태 업데이트
      setCountries(updatedCountries);

      // 입력 필드 초기화
      setCountryName("");
      setMedals({ gold: 0, silver: 0, bronze: 0 });

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

  const handleMedalChange = (type, value) => {
    setMedals((beforeMedals) => ({
      ...beforeMedals,
      [type]: value,
    }));
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
          value={medals.gold}
          onChange={(value) => handleMedalChange("gold", value)}
        />
        <MedalInput
          medalType="은메달"
          value={medals.silver}
          onChange={(value) => handleMedalChange("silver", value)}
        />
        <MedalInput
          medalType="동메달"
          value={medals.bronze}
          onChange={(value) => handleMedalChange("bronze", value)}
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

export default Content;
