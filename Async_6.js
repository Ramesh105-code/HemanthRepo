<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }
        h1 {
            font-size: 48px;
            margin: 20px 0;
        }
        button {
            padding: 10px 20px;
            margin: 5px;
            font-size: 18px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <h1 id="timerDisplay">00:00</h1>
    <button onclick="startTimer()">Start</button>
    <button onclick="stopTimer()">Stop</button>
    <button onclick="resetTimer()">Reset</button>

    <script>
        let seconds = 0;
        let timerInterval = null;

        function updateDisplay() {
            const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
            const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
            document.getElementById('timerDisplay').textContent = ${minutes}:${remainingSeconds};
        }

        function startTimer() {
            if (!timerInterval) {  // Only start if timer is not already running
                timerInterval = setInterval(() => {
                    seconds++;
                    updateDisplay();
                }, 1000);
            }
        }

        function stopTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function resetTimer() {
            stopTimer();
            seconds = 0;
            updateDisplay();
        }
    </script>

</body>
</html>