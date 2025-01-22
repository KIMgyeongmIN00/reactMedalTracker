const MedalQuantity = ({ country }) => {
  return (
    <>
      금메달:{country.goldMedal}개, 은메달:{country.silverMedal}개, 동메달:
      {country.bronzeMedal}개
    </>
  );
};

export default MedalQuantity;
