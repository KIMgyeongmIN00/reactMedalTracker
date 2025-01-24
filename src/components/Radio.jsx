import React from "react";

const CheckBox = ({ sortBy, handleCheckboxChange }) => {
  return (
    <div className="radio-list">
      <div>
        <label>
          <input
            type="radio"
            checked={sortBy.gold}
            onChange={() => handleCheckboxChange("gold")}
          />
          금메달 순
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            checked={sortBy.silver}
            onChange={() => handleCheckboxChange("silver")}
          />
          은메달 순
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            checked={sortBy.bronze}
            onChange={() => handleCheckboxChange("bronze")}
          />
          동메달 순
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            checked={sortBy.total}
            onChange={() => handleCheckboxChange("total")}
          />
          총 메달 수 순
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
