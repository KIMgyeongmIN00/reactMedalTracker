import Inputs from "./Inputs";
import Buttons from "./Buttons";
import { useState } from "react";

const Content = ({ countries, setCountries }) => {
  const [medalsInfo, setMedalsInfo] = useState({
    countryName: "",
    medals: { gold: 0, silver: 0, bronze: 0 },
  });

  // 국가 찾는 함수
  const findCountryByName = (name) => {
    return countries.find((country) => country.countryName === name);
  };

  // 국가 등록 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //중복 검사
    const isCountryFound = findCountryByName(medalsInfo.countryName);

    // 유효성 검사
    if (!medalsInfo.countryName.trim()) {
      alert("국가 이름을 입력해주세요.");
      return;
    }

    if (isCountryFound) {
      alert("이미 존재하는 국가입니다.");
      return;
    }

    const newCountry = {
      id: new Date().getTime(),
      countryName: medalsInfo.countryName,
      goldMedal: Number(medalsInfo.medals.gold),
      silverMedal: Number(medalsInfo.medals.silver),
      bronzeMedal: Number(medalsInfo.medals.bronze),
    };

    setCountries([...countries, newCountry]);

    // 인풋 내부 초기화
    setMedalsInfo({
      countryName: "",
      medals: {
        gold: 0,
        silver: 0,
        bronze: 0,
      },
    });
  };

  // 국가 업데이트 핸들러
  const handleUpdate = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!medalsInfo.countryName.trim()) {
      alert("국가 이름을 입력해주세요.");
      return;
    }

    //일치자 찾기
    const isCountryFound = findCountryByName(medalsInfo.countryName);

    if (isCountryFound) {
      // 국가가 존재하면 업데이트
      const updatedCountries = countries.map((country) => {
        if (country.countryName === medalsInfo.countryName) {
          return {
            ...country,
            goldMedal: Number(medalsInfo.medals.gold),
            silverMedal: Number(medalsInfo.medals.silver),
            bronzeMedal: Number(medalsInfo.medals.bronze),
          };
        }
        return country;
      });

      // 업데이트된 배열로 상태 업데이트
      setCountries(updatedCountries);

      // 인풋 내부 초기화
      setMedalsInfo({
        countryName: "",
        medals: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
      });

      alert(`${medalsInfo.countryName} 메달 데이터를 업데이트했습니다.`);
    } else {
      // 국가가 존재하지 않으면 경고 메시지
      alert(`${medalsInfo.countryName}에 해당하는 국가가 없습니다!`);
    }
  };

  // 국가 이름 변경 핸들러
  const handleCountryNameChange = (value) => {
    setMedalsInfo((beforeCountryName) => ({
      ...beforeCountryName,
      countryName: value,
    }));
  };

  // 메달 개수 변경 핸들러
  const handleMedalChange = (type, value) => {
    setMedalsInfo((beforeMedals) => ({
      ...beforeMedals,
      medals: {
        ...beforeMedals.medals,
        [type]: value,
      },
    }));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Inputs
          label="국가이름"
          type="text"
          value={medalsInfo.countryName}
          onChange={handleCountryNameChange}
        />
        <Inputs
          label="금메달"
          type="number"
          value={medalsInfo.medals.gold}
          onChange={(value) => handleMedalChange("gold", value)}
        />
        <Inputs
          label="은메달"
          type="number"
          value={medalsInfo.medals.silver}
          onChange={(value) => handleMedalChange("silver", value)}
        />
        <Inputs
          label="동메달"
          type="number"
          value={medalsInfo.medals.bronze}
          onChange={(value) => handleMedalChange("bronze", value)}
        />
        <Buttons
          handleFormSubmit={handleFormSubmit}
          handleUpdate={handleUpdate}
        />
      </form>
    </>
  );
};

export default Content;
