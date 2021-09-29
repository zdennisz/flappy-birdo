import React, { useState, useEffect, useCallback } from "react";
import Bird from "../Bird/Bird";
import Obstacles from "../Obstacles/Obstacles";
import GameOver from "../GameOver/GameOver";
import { GAME_SCREEN_SKY_CONTAINER } from "../../constants/globals";
import "./GameScreen.scss";

interface GameScreenProps {
	gameScreenWidth: number;
}

const GameScreen = ({ gameScreenWidth }: GameScreenProps) => {
	const [score, setScore] = useState(0);
	const [birdBottom, setBirdBottom] = useState(GAME_SCREEN_SKY_CONTAINER / 2.0);
	const [heightLimit] = useState(GAME_SCREEN_SKY_CONTAINER - 1);
	const birdLeft = GAME_SCREEN_SKY_CONTAINER / 2;
	const [isGameOver, setIsGameOver] = useState(false);

	const restartGame = useCallback(() => {
		setBirdBottom(GAME_SCREEN_SKY_CONTAINER / 2);
		setIsGameOver(false);
		setScore(0);
	}, []);

	const birdJumpHandler = () => {
		setBirdBottom((state) => state + 0.1);
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
