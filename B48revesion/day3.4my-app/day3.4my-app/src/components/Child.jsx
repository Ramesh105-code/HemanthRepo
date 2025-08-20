import React from "react";

const Child = ({ value }) => {
  console.log("Child rendered");
  return <div>Child value: {value}</div>;
};

export default React.memo(Child);
