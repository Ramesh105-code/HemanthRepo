import React, { useState, useEffect } from "react";


const handleClick = (value) => {
setRating(value);
};


const handleClear = () => {
setRating(0);
localStorage.removeItem("feedback_rating");
};


return (
<div className="flex flex-col items-center gap-3">
<div className="flex gap-1">
{Array.from({ length: numberOfStars }, (_, i) => i + 1).map((star) => (
<svg
key={star}
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="currentColor"
className={`w-8 h-8 cursor-pointer transition-colors ${
star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
}`}
onMouseEnter={() => setHover(star)}
onMouseLeave={() => setHover(0)}
onClick={() => handleClick(star)}
>
<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.853 1.48 8.254L12 18.896l-7.416 4.517 1.48-8.254L0 9.306l8.332-1.151z" />
</svg>
))}
</div>


{/* Rating Display */}
{rating > 0 ? (
<p className="text-sm font-medium">You rated: {rating}/{numberOfStars}</p>
) : (
<p className="text-sm text-gray-500">No rating selected</p>
)}


{/* Bonus: Clear Rating */}
{rating > 0 && (
<button
onClick={handleClear}
className="mt-2 px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
>
Clear Rating
</button>
)}
</div>
);
