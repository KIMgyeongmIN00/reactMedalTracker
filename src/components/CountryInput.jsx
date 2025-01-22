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

export default CountryInput;
