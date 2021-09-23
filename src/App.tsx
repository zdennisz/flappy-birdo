import React, { useEffect, useState } from 'react';
import './App.scss';
import Bird from './components/Bird/Bird'
import Obstacles from './components/Obstacles/Obstacles';
import useWindowSize from './hooks/useWindowSize/useWindowSize';
import useKeyPress from './hooks/useKeyPress/useKeyPress'
import GameOver from './components/GameOver/GameOver'
import MainScreen from './components/MainScreen/MainScreen'

let gameGravityLoop: NodeJS.Timeout
let obstacles: NodeJS.Timeout
let obstaclesTwo: NodeJS.Timeout
const App = () => {
  //obstacle sizes
  const obsHeight = 300
  const obsWidth = 50
  const obsGap = 200

  //states
  const size = useWindowSize()
  const [birdBottom, SetBirdBottom] = useState(size.height / 2)
  const [obsLeft, SetObsLeft] = useState(size.width)
  const [obsLeftTwo, SetObsLeftTwo] = useState(size.width + size.width / 2)
  const [obsNegHeight, SetObsNegHeight] = useState(-Math.random() * 100)
  const [obsNegHeightTwo, SetObsNegHeightTwo] = useState(-Math.random() * 100)
  const [isGameOver, SetIsGameOver] = useState(false)
  const keyPressed: boolean = useKeyPress({ key: " " })
  const [score, SetScore] = useState(0)
  const [mainScreen, SetMainScreen] = useState(true)
  const gravity = 5
  //initial location
  const birdLeft = size.width / 2
  const startGame = () => {
    if (mainScreen) {
      SetMainScreen(false)
      restartGame()
    }
  }
  //obstecale number 1
  useEffect(() => {
    if (obsLeft > -obsWidth) {

      if (birdLeft === obsLeft + 30) {
        //score accumulation
        SetScore(score => score + 1)
      }
      obstacles = setInterval(() => {
        //moves the obstacle
        SetObsLeft(state => state - 1)

      }, 30)
      return () => {
        clearInterval(obstacles)
      }
    } else {
      //resets the obstacle
      SetObsLeft(size.width)
      SetObsNegHeight(-Math.random() * 100)

    }

  }, [obsLeft, size.width, birdLeft])

  //obstecale number 2
  useEffect(() => {
    if (obsLeftTwo > -obsWidth) {
      if (birdLeft === obsLeftTwo + 30) {
        //score accumulation
        SetScore(score => score + 1)
      }
      obstaclesTwo = setInterval(() => {
        //moves the obstacle
        SetObsLeftTwo(state => state - 1)

      }, 30)
      return () => {
        clearInterval(obstaclesTwo)
      }
    } else {
      //resets the obstacle
      SetObsLeftTwo(size.width)
      SetObsNegHeightTwo(-Math.random() * 100)

    }

  }, [obsLeftTwo, size.width, birdLeft])

  //falling bird animation
  useEffect(() => {
    if (birdBottom > 30) {
      gameGravityLoop = setInterval(() => {
        SetBirdBottom(state => state - gravity)
      }, 30)
    } else {
      gameOver()
    }


    return () => {
      clearInterval(gameGravityLoop)
    }

  }, [birdBottom])



  const jumpHandler = () => {
    SetBirdBottom(state => state + 1)
  }
  //check collision
  useEffect(() => {

    if (size.width) {
      if (
        ((birdBottom < (obsNegHeight + obsHeight + 30) || birdBottom > (obsNegHeight + obsHeight + obsGap - 30)) && obsLeft > size.width / 2 - 30 && obsLeft < size.width / 2 + 30)
        ||
        ((birdBottom < (obsNegHeightTwo + obsHeight + 30) || birdBottom > (obsNegHeightTwo + obsHeight + obsGap - 30)) && obsLeftTwo > size.width / 2 - 30 && obsLeftTwo < size.width / 2 + 30)) {
        gameOver()
      }
    }

  }, [size.width, birdBottom, obsNegHeight, obsLeftTwo, obsLeft, obsNegHeightTwo])

  //check if jump aviliable
  useEffect(() => {
    if (!isGameOver && keyPressed && birdBottom < size.height - 400) {
      jumpHandler()
    }
  }, [isGameOver, keyPressed, birdBottom, size.height])

  const gameOver = () => {
    clearInterval(gameGravityLoop)
    clearInterval(obstacles)
    clearInterval(obstaclesTwo)
    SetIsGameOver(true)
  }
  const restartGame = () => {

    SetBirdBottom(size.height / 2)
    SetObsLeft(size.width)
    SetObsLeftTwo(size.width + size.width / 2)
    SetObsNegHeight(0)
    SetObsNegHeightTwo(0)
    SetIsGameOver(false)
    SetScore(0)
  }
  return (
    <div className="App">
      <div className="game-container">
        {mainScreen ? <MainScreen startGame={startGame} /> :
          <>
            <div className="sky">
              {isGameOver && <GameOver score={score} retry={restartGame} />}
              <Bird bottom={birdBottom} left={birdLeft} isFlapping={isGameOver ? false : keyPressed} />
              <Obstacles left={obsLeft} height={obsHeight} width={obsWidth} gap={obsGap} bottom={obsNegHeight} />
              <Obstacles left={obsLeftTwo} height={obsHeight} width={obsWidth} gap={obsGap} bottom={obsNegHeightTwo} />
            </div>
            <div className="ground"></div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
