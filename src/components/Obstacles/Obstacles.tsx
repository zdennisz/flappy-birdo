import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Obstacles.scss";
import Obstacle from "../Obstacle/Obstacle";
import {
	OBSTACLE_GAP,
	BIRD_HEIGHT_HALF,
	OBSTACLE_WIDTH,
	BIRD_WIDTH,
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

	// Clears the interval once obstacle was hit
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
		if (!isGameOver) {
			const initData: Array<ObstacleEntity> = [];
			for (let i = 0; i < amountOfObstacles; i++) {
				initData.push({
					obstaclesLeft: screenSizeWidth + obstaclesGap * i,
					obstacleNegativeGap: generateNegativeHeight(),
				});
			}
			setObstacles(initData);
		}
	}, [amountOfObstacles, obstaclesGap, screenSizeWidth, isGameOver]);

	// If the game ends clear the interval
	useEffect(() => {
		if (isGameOver) {
			obstacleWasHit();
		}
	}, [isGameOver, obstacleWasHit]);

	// Check collision
	const checkCollision = useCallback(() => {
		// Iterate over each obstacle and check it it was hit
		if (!isGameOver) {
			obstacles.forEach((obstacle, index) => {
				const obstacleBottomPoint =
					obstacle.obstacleNegativeGap + obsHeight + BIRD_HEIGHT_HALF;
				const obstacleTopPoint =
					obstacle.obstacleNegativeGap +
					obsHeight +
					OBSTACLE_GAP -
					BIRD_HEIGHT_HALF;
				console.log("birdBottom", birdBottom);
				console.log("obstacleTopPoint", obstacleTopPoint);
				console.log("obstacleBottomPoint", obstacleBottomPoint);
				console.log("obstacle.obstaclesLeft", obstacle.obstaclesLeft);
				console.log("birdLeft + BIRD_WIDTH", birdLeft + BIRD_WIDTH);

				if (
					(birdBottom < obstacleTopPoint || birdBottom > obstacleBottomPoint) &&
					birdLeft + BIRD_WIDTH > obstacle.obstaclesLeft
				) {
					obstacleWasHit();
				} else if (obstacle.obstaclesLeft === birdLeft + BIRD_HEIGHT_HALF) {
					updateScore();
				}
			});
		}
	}, [
		isGameOver,
		birdBottom,
		birdLeft,
		obsHeight,
		obstacleWasHit,
		obstacles,
		updateScore,
	]);

	// In charge of moving the obstacles and activating the collision check
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
