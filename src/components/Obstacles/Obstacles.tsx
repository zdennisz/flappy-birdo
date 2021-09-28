import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Obstacles.scss";
import Obstacle from "../Obstacle/Obstacle";
import {
	OBSTACLE_GAP,
	BIRD_HEIGHT_HALF,
	OBSTACLE_WIDTH,
} from "../../constants/globals";
import { ObstacleEntity } from "../../constants/types";
let obstacleInterval: NodeJS.Timeout;
interface ObstacleProps {
	amountOfObstacles: number;
	screenSizeWidth: number;
	isGameOver: boolean;
	birdLeft: number;
	hitHandler: () => void;
	updateScore: () => void;
	birdBottom: number;
}

const Obstacles = ({
	amountOfObstacles,
	screenSizeWidth,
	isGameOver,
	hitHandler,
	updateScore,
	birdBottom,
	birdLeft,
}: ObstacleProps) => {
	let obsHeight = 300;
	const [obstacles, setObstacles] = useState<Array<ObstacleEntity>>([]);

	const obstaclesGap = Math.floor(screenSizeWidth / amountOfObstacles);

	// Clears the interval once we unmount
	const gameOver = () => {
		clearInterval(obstacleInterval);
		hitHandler();
	};

	const obstacleWasHit = useCallback(() => {
		clearInterval(obstacleInterval);
		hitHandler();
	}, [hitHandler]);

	// Generate negative number to create random heights of the obstacles
	const generateNegativeHeight = () => {
		return -Math.random() * 100;
	};
	// Generate an array which represents the obstacles
	useEffect(() => {
		const initData: Array<ObstacleEntity> = [];
		for (let i = 0; i < amountOfObstacles; i++) {
			initData.push({
				obstaclesLeft: screenSizeWidth + obstaclesGap * i,
				obstacleNegativeGap: generateNegativeHeight(),
			});
		}
		setObstacles(initData);
	}, [amountOfObstacles, obstaclesGap, screenSizeWidth]);

	// If the game ends clear the interval
	useEffect(() => {
		if (isGameOver) {
			gameOver();
		}
	}, [isGameOver]);

	// Check collision
	const checkCollision = useCallback(() => {
		// Iterate over each obstacle and check it it was hit
		obstacles.forEach((obstacle, index) => {
			if (
				(birdBottom <
					obstacle.obstacleNegativeGap + obsHeight + BIRD_HEIGHT_HALF ||
					birdBottom >
						obstacle.obstacleNegativeGap +
							obsHeight +
							OBSTACLE_GAP -
							BIRD_HEIGHT_HALF) &&
				obstacle.obstaclesLeft >
					screenSizeWidth / amountOfObstacles - BIRD_HEIGHT_HALF &&
				obstacle.obstaclesLeft <
					screenSizeWidth / amountOfObstacles + BIRD_HEIGHT_HALF
			) {
				obstacleWasHit();
			} else if (obstacle.obstaclesLeft === birdLeft + BIRD_HEIGHT_HALF) {
				updateScore();
			}
		});
	}, [
		amountOfObstacles,
		birdBottom,
		birdLeft,
		obsHeight,
		obstacleWasHit,
		obstacles,
		screenSizeWidth,
		updateScore,
	]);

	useEffect(() => {
		if (!isGameOver) {
			checkCollision();
			clearInterval(obstacleInterval);
			obstacleInterval = setInterval(() => {
				setObstacles((prevObstacle) => {
					return prevObstacle.map((obstacle, index) => {
						return {
							...obstacle,
							obstaclesLeft:
								obstacle.obstaclesLeft < -OBSTACLE_WIDTH
									? screenSizeWidth
									: obstacle.obstaclesLeft - 1,
						};
					});
				});
			}, 10);
		}
	}, [checkCollision, screenSizeWidth, obstacles, isGameOver]);

	return (
		<>
			{obstacles.length > 0
				? obstacles.map((obstacle, index) => {
						return (
							<Obstacle
								height={obsHeight}
								left={obstacle.obstaclesLeft}
								bottom={obstacle.obstacleNegativeGap}
							/>
						);
				  })
				: null}
		</>
	);
};

export default Obstacles;
