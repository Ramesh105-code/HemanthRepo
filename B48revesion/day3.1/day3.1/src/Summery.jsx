import React from "react";

function Summary({ totalPrice }) {
  return <h3>Total Price: ${totalPrice}</h3>;
}

export default React.memo(Summary);
