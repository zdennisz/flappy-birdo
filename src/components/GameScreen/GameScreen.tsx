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
	obsHeight: number;
}

const GameScreen = (params: GameScreenProps) => {
	const [score, setScore] = useState(0);
	const [birdBottom, setBirdBottom] = useState(params.gameScreenHeight / 2);
	const [obsLeft, setObsLeft] = useState(params.gameScreenWidth);
	const [obsLeftTwo, setObsLeftTwo] = useState(
		params.gameScreenWidth + params.gameScreenWidth / 2
	);
	const birdLeft = params.gameScreenWidth / 2;
	const keyPressed: boolean = useKeyPress();
	const [isGameOver, setIsGameOver] = useState(false);
	const [obsNegHeight, setObsNegHeight] = useState(-Math.random() * 100);
	const [obsNegHeightTwo, setObsNegHeightTwo] = useState(-Math.random() * 100);

	const restartGame = () => {
		setBirdBottom(params.gameScreenHeight / 2);
		setObsLeft(params.gameScreenWidth);
		setObsLeftTwo(params.gameScreenWidth + params.gameScreenWidth / 2);
		setObsNegHeight(0);
		setObsNegHeightTwo(0);
		setIsGameOver(false);
		setScore(0);
	};
	const gameOver = () => {
		clearInterval(obstacles);
		clearInterval(obstaclesTwo);
		setIsGameOver(true);
	};
	const jumpHandler = () => {
		setBirdBottom((state) => state + 1);
	};
	const updateBirdBottom = (newVal: number) => {
		setBirdBottom(newVal);
	};

	//obstecale number 1
	useEffect(() => {
		if (obsLeft > -OBSTACLE_WIDTH) {
			if (birdLeft === obsLeft + 30) {
				//score accumulation
				setScore((score) => score + 1);
			}
			obstacles = setInterval(() => {
				//moves the obstacle
				setObsLeft((state) => state - 1);
			}, 30);
			return () => {
				clearInterval(obstacles);
			};
		} else {
			//resets the obstacle
			setObsLeft(params.gameScreenWidth);
			setObsNegHeight(-Math.random() * 100);
		}
	}, [obsLeft, params.gameScreenWidth, birdLeft]);

	//obstecale number 2
	useEffect(() => {
		if (obsLeftTwo > -OBSTACLE_WIDTH) {
			if (birdLeft === obsLeftTwo + 30) {
				//score accumulation
				setScore((score) => score + 1);
			}
			obstaclesTwo = setInterval(() => {
				//moves the obstacle
				setObsLeftTwo((state) => state - 1);
			}, 30);
			return () => {
				clearInterval(obstaclesTwo);
			};
		} else {
			//resets the obstacle
			setObsLeftTwo(params.gameScreenWidth);
			setObsNegHeightTwo(-Math.random() * 100);
		}
	}, [obsLeftTwo, params.gameScreenWidth, birdLeft]);

	//check collision
	useEffect(() => {
		if (params.gameScreenWidth) {
			if (
				((birdBottom < obsNegHeight + params.obsHeight + 30 ||
					birdBottom > obsNegHeight + params.obsHeight + OBSTACLE_GAP - 30) &&
					obsLeft > params.gameScreenWidth / 2 - 30 &&
					obsLeft < params.gameScreenWidth / 2 + 30) ||
				((birdBottom < obsNegHeightTwo + params.obsHeight + 30 ||
					birdBottom >
						obsNegHeightTwo + params.obsHeight + OBSTACLE_GAP - 30) &&
					obsLeftTwo > params.gameScreenWidth / 2 - 30 &&
					obsLeftTwo < params.gameScreenWidth / 2 + 30)
			) {
				gameOver();
			}
		}
	}, [
		params.gameScreenWidth,
		birdBottom,
		obsNegHeight,
		obsLeftTwo,
		obsLeft,
		obsNegHeightTwo,
		params.obsHeight,
	]);

	//check if jump aviliable
	useEffect(() => {
		if (
			!isGameOver &&
			keyPressed &&
			birdBottom < params.gameScreenHeight - 400
		) {
			jumpHandler();
		}
	}, [isGameOver, keyPressed, birdBottom, params.gameScreenHeight]);

	return (
		<>
			<div className='sky'>
				{isGameOver && <GameOver score={score} retry={restartGame} />}
				<Bird
					birdBottom={birdBottom}
					left={birdLeft}
					isFlapping={isGameOver ? false : keyPressed}
					updateBirdBottom={updateBirdBottom}
					isGameOver={isGameOver}
				/>
				<Obstacles
					left={obsLeft}
					height={params.obsHeight}
					bottom={obsNegHeight}
				/>
				<Obstacles
					left={obsLeftTwo}
					height={params.obsHeight}
					bottom={obsNegHeightTwo}
				/>
			</div>
			<div className='ground'></div>
		</>
	);
};

export default GameScreen;
