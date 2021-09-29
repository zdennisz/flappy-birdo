import React, { useState, useEffect, useCallback } from "react";
import Bird from "../Bird/Bird";
import Obstacles from "../Obstacles/Obstacles";
import GameOver from "../GameOver/GameOver";
import useKeyPress from "../../hooks/useKeyPress";
import "./GameScreen.scss";

interface GameScreenProps {
	gameScreenWidth: number;
	gameScreenHeight: number;
}

const GameScreen = ({ gameScreenHeight, gameScreenWidth }: GameScreenProps) => {
	const [score, setScore] = useState(0);
	const [birdBottom, setBirdBottom] = useState(gameScreenHeight / 2);
	const [heightLimit] = useState(gameScreenHeight - 400);
	const birdLeft = gameScreenWidth / 2;
	const [isGameOver, setIsGameOver] = useState(false);

	const restartGame = useCallback(() => {
		setBirdBottom(gameScreenHeight / 2);
		setIsGameOver(false);
		setScore(0);
	}, [gameScreenHeight]);

	const birdJumpHandler = () => {
		setBirdBottom((state) => state + 1);
	};
	const updateGravityEffectOnBirdBottom = (newVal: number) => {
		setBirdBottom(newVal);
	};

	const updateScore = () => {
		setScore((score) => score + 1);
	};

	const hitHandler = useCallback(() => {
		setIsGameOver(true);
	}, []);

	return (
		<>
			<div className='sky'>
				{isGameOver && <GameOver score={score} restartGame={restartGame} />}
				<Bird
					birdBottom={birdBottom}
					birdLeft={birdLeft}
					updateGravityEffectOnBirdBottom={updateGravityEffectOnBirdBottom}
					isGameOver={isGameOver}
					birdJumpHandler={birdJumpHandler}
					heightLimit={heightLimit}
					hitHandler={hitHandler}
				/>
				<Obstacles
					amountOfObstacles={3}
					screenSizeWidth={gameScreenWidth}
					isGameOver={isGameOver}
					birdLeft={birdLeft}
					birdBottom={birdBottom}
					hitHandler={hitHandler}
					updateScore={updateScore}
				/>
			</div>
			<div className='ground'></div>
		</>
	);
};

export default GameScreen;
