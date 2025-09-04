import React from "react";
import FeedbackStars from "./components/FeedbackStars";


export default function App() {
const handleRatingChange = (rating) => {
console.log("User selected rating:", rating);
};


return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
<h1 className="text-2xl font-bold mb-6">Feedback Rating Component ⭐</h1>
<FeedbackStars numberOfStars={5} onRatingChange={handleRatingChange} />
</div>
);
}