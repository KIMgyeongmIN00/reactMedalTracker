import CountryName from "./CountryName";
import MedalQuantity from "./MedalQuantity";

const ListCountry = ({ countries, updateLocalStorage, sortBy }) => {
  // 국가 삭제 핸들러
  const handleDelete = (id) => {
    // 국가 삭제
    const deletedCountries = countries.filter((country) => country.id !== id);
    updateLocalStorage(deletedCountries);

    // 삭제할 국가 찾고
    const countryToDelete = countries.find((country) => country.id === id);

    // 삭제된 국가 이름을 알림창에 표시
    alert(`${countryToDelete.countryName} 국가를 삭제했습니다.`);
  };

  const sortedCountries = [...countries].sort((a, b) => {
    // 총 메달 수 계산
    const totalA = a.goldMedal + a.silverMedal + a.bronzeMedal;
    const totalB = b.goldMedal + b.silverMedal + b.bronzeMedal;

    // 정렬 기준에 따라 분기
    switch (true) {
      // 1순위: 체크한 메달
      case sortBy.gold && b.goldMedal !== a.goldMedal:
        return b.goldMedal - a.goldMedal; // 금메달 기준 내림차순
      case sortBy.silver && b.silverMedal !== a.silverMedal:
        return b.silverMedal - a.silverMedal; // 은메달 기준 내림차순
      case sortBy.bronze && b.bronzeMedal !== a.bronzeMedal:
        return b.bronzeMedal - a.bronzeMedal; // 동메달 기준 내림차순
      case sortBy.total && totalB !== totalA:
        return totalB - totalA; // 총 메달 수 기준 내림차순

      // 2순위: 금메달
      case b.goldMedal !== a.goldMedal:
        return b.goldMedal - a.goldMedal;

      // 3순위: 은메달
      case b.silverMedal !== a.silverMedal:
        return b.silverMedal - a.silverMedal;

      // 4순위: 동메달
      default:
        return b.bronzeMedal - a.bronzeMedal;
    }
  });

  return (
    <>
      <div className="list-header">
        <span>국가</span>
        <span>금메달</span>
        <span>은메달</span>
        <span>동메달</span>
        <span>총 메달</span>
        <span>액션</span>
      </div>
      <ul>
        {sortedCountries.map((country) => {
          const countryTotalMedals =
            country.goldMedal + country.silverMedal + country.bronzeMedal;
          return (
            <li key={country.id}>
              <CountryName name={country.countryName} />
              <MedalQuantity
                value={country.goldMedal}
                className={"golds"}
                type={"금메달"}
              />
              <MedalQuantity
                value={country.silverMedal}
                className={"silvers"}
                type={"은메달"}
              />
              <MedalQuantity
                value={country.bronzeMedal}
                className={"bronzes"}
                type={"동메달"}
              />
              <MedalQuantity
                value={countryTotalMedals}
                id={"totals"}
                type={"총 메달"}
              />
              <button
                className="delete-button"
                onClick={() => handleDelete(country.id)}
              >
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListCountry;
