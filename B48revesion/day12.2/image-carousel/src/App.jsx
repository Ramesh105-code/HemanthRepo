import React from "react";
import Carousel from "./components/Carousel";

const App = () => {
  const images = [
    "https://picsum.photos/id/1018/1000/500",
    "https://picsum.photos/id/1015/1000/500",
    "https://picsum.photos/id/1019/1000/500",
    "https://picsum.photos/id/1020/1000/500",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Carousel images={images} />
    </div>
  );
};

export default App;
