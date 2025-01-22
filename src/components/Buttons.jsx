const Buttons = ({ handleUpdate }) => {
  return (
    <>
      <button type="submit">국가 등록하기</button>
      <button type="button" onClick={handleUpdate}>
        업데이트
      </button>
    </>
  );
};

export default Buttons;
