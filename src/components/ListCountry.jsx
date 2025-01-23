import CountryName from "./CountryName";
import MedalQuantity from "./MedalQuantity";

const ListCountry = ({ countries, updateLocalStorage }) => {
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

export default ListCountry;
