let time = 5;

const timer = setInterval(() => {
  if (time >= 0) {
    console.log(`Time left: ${time} seconds`);
    time--;
  } else {
    console.log('Countdown finished!');
    clearInterval(timer); 
  }
}, 1000);
