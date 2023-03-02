import React from "react";

export const CatItem = (props) => {
  return (
    <>
      <li>
        <img src={props.img} style={{ width: "150px" }} alt="props.img" />
      </li>
    </>
  );
};
