import CountryName from "./CountryName";
import MedalQuantity from "./MedalQuantity";

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

export default ListCountry;
