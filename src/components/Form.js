import React, { useState } from "react";

const Form = ({ updateMainCat, loading }) => {
  const [value, setValue] = useState("");
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const useValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(useValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    }
    setValue(e.target.value.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("빈값으로 만들 수 없습니다.");
      return;
    }
    //업데이트 하기
    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />

      {loading ? (
        <button type="button">로딩중</button>
      ) : (
        <button type="submit">생성</button>
      )}

      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default Form;
