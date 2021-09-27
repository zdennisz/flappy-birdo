import React, { useState, useEffect } from "react";
import Bird from "../Bird/Bird";
import Obstacles from "../Obstacles/Obstacles";
import GameOver from "../GameOver/GameOver";
import useKeyPress from "../../hooks/useKeyPress";
import { OBSTACLE_GAP, OBSTACLE_WIDTH } from "../../constants/globals";
import "./GameScreen.scss";

let obstacles: NodeJS.Timeout;
let obstaclesTwo: NodeJS.Timeout;

interface GameScreenProps {
	gameScreenWidth: number;
	gameScreenHeight: number;
}

const GameScreen = ({ gameScreenHeight, gameScreenWidth }: GameScreenProps) => {
	const [score, setScore] = useState(0);
	const [birdBottom, setBirdBottom] = useState(gameScreenHeight / 2);
	const [heightLimit] = useState(gameScreenHeight - 400);
	const birdLeft = gameScreenWidth / 2;
	const keyPressed: boolean = useKeyPress();
	const [isGameOver, setIsGameOver] = useState(false);

	const restartGame = () => {
		setBirdBottom(gameScreenHeight / 2);
		setIsGameOver(false);
		setScore(0);
	};
	const gameOver = () => {
		setIsGameOver(true);
	};
	const birdJumpHandler = () => {
		setBirdBottom((state) => state + 1);
	};
	const updateBirdBottom = (newVal: number) => {
		setBirdBottom(newVal);
	};

	const updateScore = () => {
		setScore((score) => score + 1);
	};

	const isHit = (birdHitObstacle: boolean) => {
		if (birdHitObstacle) {
			gameOver();
		}
	};

	return (
		<>
			<div className='sky'>
				{isGameOver && <GameOver score={score} retry={restartGame} />}
				<Bird
					birdBottom={birdBottom}
					birdLeft={birdLeft}
					isKeyPressed={isGameOver ? false : keyPressed}
					updateBirdBottom={updateBirdBottom}
					isGameOver={isGameOver}
					birdJumpHandler={birdJumpHandler}
					heightLimit={heightLimit}
				/>
				<Obstacles
					amountOfObstacles={3}
					screenSizeWidth={gameScreenWidth}
					isGameOver={isGameOver}
					birdLeft={birdLeft}
					birdBottom={birdBottom}
					isHit={isHit}
					updateScore={updateScore}
				/>
			</div>
			<div className='ground'></div>
		</>
	);
};

export default GameScreen;
