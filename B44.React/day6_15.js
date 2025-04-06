import React, { useRef } from "react";

const CustomVideoPlayer = () => {
  const videoRef = useRef(null); 

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleRestart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="480"
        height="270"
        controls={false}
        style={{ border: "1px solid #ccc" }}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
