const Input = ({ label, type, value, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default Input;
