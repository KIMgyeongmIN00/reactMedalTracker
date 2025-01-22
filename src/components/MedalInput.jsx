const MedalInput = ({ medalType, value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={medalType}
      min="0"
    />
  );
};

export default MedalInput;
