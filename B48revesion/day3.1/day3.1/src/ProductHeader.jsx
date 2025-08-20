import React from "react";

function ProductHeader({ count, filter }) {
  return (
    <h2>
      {count} products {filter !== "All" && `(Filtered by ${filter})`}
    </h2>
  );
}

export default React.memo(ProductHeader); 
