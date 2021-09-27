import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Obstacles.scss";
import Obstacle from "../Obstacle/Obstacle";
import {
	OBSTACLE_GAP,
	BIRD_WIDTH_HALF,
	OBSTACLE_WIDTH,
} from "../../constants/globals";
import { ObstacleEntity } from "../../constants/types";
let obstacleInterval: NodeJS.Timeout;
interface ObstacleProps {
	amountOfObstacles: number;
	screenSizeWidth: number;
	isGameOver: boolean;
	birdLeft: number;
	isHit: (hit: boolean) => void;
	updateScore: () => void;
	birdBottom: number;
}

const Obstacles = ({
	amountOfObstacles,
	screenSizeWidth,
	isGameOver,
	isHit,
	updateScore,
	birdBottom,
	birdLeft,
}: ObstacleProps) => {
	let obsHeight = 300;
	const [obstacles, setObstacles] = useState<Array<ObstacleEntity>>([]);

	const obstaclesGap = Math.floor(
		screenSizeWidth / (screenSizeWidth + screenSizeWidth / amountOfObstacles)
	);

	// Clears the interval once we unmount
	const gameOver = () => {
		clearInterval(obstacleInterval);
	};

	const obstacleWasHit = useCallback(() => {
		clearInterval(obstacleInterval);
		isHit(true);
	}, [isHit]);

	// Generate negative number to create random heights of the obstacles
	const generateNegativeHeight = () => {
		return -Math.random() * 100;
	};
	// Generate an array which represents the obstacles
	useEffect(() => {
		const initData: Array<ObstacleEntity> = [];
		for (let i = 0; i < amountOfObstacles; i++) {
			initData.push({
				obstaclesLeft: obstaclesGap * i,
				obstacleNegativeGap: generateNegativeHeight(),
			});
		}
		setObstacles(initData);
	}, [amountOfObstacles, obstacles, obstaclesGap]);

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
					obstacle.obstacleNegativeGap + obsHeight + BIRD_WIDTH_HALF ||
					birdBottom >
						obstacle.obstacleNegativeGap +
							obsHeight +
							OBSTACLE_GAP -
							BIRD_WIDTH_HALF) &&
				obstacle.obstaclesLeft >
					screenSizeWidth / amountOfObstacles - BIRD_WIDTH_HALF &&
				obstacle.obstaclesLeft <
					screenSizeWidth / amountOfObstacles + BIRD_WIDTH_HALF
			) {
				obstacleWasHit();
			} else if (obstacle.obstaclesLeft === birdLeft + BIRD_WIDTH_HALF) {
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
		checkCollision();
		obstacleInterval = setInterval(() => {
			const updatedObstacleData = obstacles.map((obstacle, index) => {
				return {
					...obstacle,
					obstaclesLeft:
						obstacle.obstaclesLeft < -OBSTACLE_WIDTH
							? screenSizeWidth
							: obstacle.obstaclesLeft - 1,
				};
			});
			setObstacles(updatedObstacleData);
		}, 30);
	}, [obstacles, checkCollision, screenSizeWidth]);

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
