import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // state to store score, time and score circles
  const [points, setPoints] = useState();
  const [circles, setCircles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); //Check trạng thái game
  const [pointArr, setPointArr] = useState([]);

  // time state
  const [time, setTime] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);
  const [current, setCurrent] = useState();

  const [expectedNumber, setExpectedNumber] = useState(1);

  let getGameState = document.getElementById("game-state");

  //---------< Time Function >----------
  const startTimer = () => {
    setTimeInterval(setInterval(() => {
      setTime((prev) => prev + 0.1);
    }, 100))
  }
  const stopTimer = () => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  }
  const resetTimer = () => {
    setTime(0);
    stopTimer();
  }
  //---------< End Time Function >----------

  const handleInputPoint = (event) => {
    setPoints(Number(event.target.value));
    setCurrent(parseInt(document.getElementById('input-point').value))
  };

  // Generate points with random positions
  const generatePoint = (points) => {
    const pointArr = [];
    for (let i = 1; i <= points; i++) {
      pointArr.push({
        id: i,
        x: Math.random() * 90 + '%',
        y: Math.random() * 90 + '%',
      });
    }
    return pointArr;
  };

  // handle game play
  const startGame = (e) => {
    setPoints(current);
    if (!points) {
      alert("Please enter points!")
    } else {
      resetTimer();
      startTimer();
      setCircles(generatePoint(points));
      setIsPlaying(true);
      setExpectedNumber(1);
      setPointArr([]);
    }
    getGameState.innerHTML = "Let's Play"
    getGameState.style.color = "black"
  };

  const restartGame = () => {
    if (!points) {
      alert("Please enter points!")
    } else {
      resetTimer();
      startTimer();
      setCircles(generatePoint(points));
      setIsPlaying(true);
      setExpectedNumber(1);
      setPointArr([]);
      getGameState.innerHTML = "Let's Play"
      getGameState.style.color = "black";
    }
  }

  // handle click number function
  const handlePointClick = (id) => {
    console.log(expectedNumber)
    if (id === expectedNumber) {
      console.log(true);
      setCircles(circles.filter((circle) => circle.id !== id));
      setPoints((prev) => prev - 1);
      setPointArr((prev) => [...prev, id])
    }
    else {
      stopTimer();
      setPoints(current)
      console.log(false);
      getGameState.innerHTML = "Game Over!"
      getGameState.style.color = "red";
    }
    setExpectedNumber(expectedNumber + 1);

    // when the game finished with the correct score
    if (points - 1 === 0) {
      setIsPlaying(false);
      setPoints(current);
      stopTimer();
      getGameState.innerHTML = "All Cleared!"
      getGameState.style.color = "blue";
    }
  };

  useEffect(() => {
    console.log(getGameState)
  }, [pointArr])

  return (
    <div className="App">
      <div className="game-container">
        <div className='game-heading'>
          <h1 id="game-state">Let's Play</h1>
          <div>
            Points: <input id="input-point" type="number" onChange={handleInputPoint} />
          </div>
          <div>Time: {time.toFixed(1)}s</div>

          <button className="play-btn" onClick={isPlaying ? restartGame : startGame}>
            {isPlaying ? "Restart" : "Play"}
          </button>
        </div>
        <div className="game-area">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="circle-point"
              style={{
                top: circle.y,
                left: circle.x,
                backgroundColor: "lightblue"
              }}
              onClick={() => {
                handlePointClick(circle.id);
              }}
            >
              {circle.id}
            </div>
          ))}
        </div>

      </div>
    </div>
  );

}

export default App;
