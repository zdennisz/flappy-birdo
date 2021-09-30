import React, {
	useState,
	useEffect,
	useCallback,
	useLayoutEffect,
} from "react";
import Obstacle from "../Obstacle/Obstacle";
import {
	OBSTACLE_GAP,
	BIRD_HEIGHT_HALF,
	OBSTACLE_WIDTH,
	BIRD_WIDTH,
	BIRD_WIDTH_HALF,
	BIRD_HEIGHT,
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
	const [obstacles, setObstacles] = useState<Array<ObstacleEntity>>([]);

	const obstaclesGap = Math.floor(screenSizeWidth / amountOfObstacles);

	// Clears the interval once obstacle was hit
	const obstacleWasHit = useCallback(() => {
		clearInterval(obstacleInterval);
		hitHandler();
	}, [hitHandler]);

	// Generate random heights  for  the obstacles between 5 and 50
	const generateRandomHeight = () => {
		return Math.floor(Math.random() * 45) + 5;
	};
	// Generate an array which represents the obstacles
	useLayoutEffect(() => {
		if (!isGameOver) {
			const initData: Array<ObstacleEntity> = [];
			for (let i = 0; i < amountOfObstacles; i++) {
				initData.push({
					left: screenSizeWidth + obstaclesGap * i,
					height: generateRandomHeight(),
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

	// In charge of moving the obstacles and activating the collision check
	useEffect(() => {
		if (!isGameOver) {
			for (const obstacle of obstacles) {
				const birdRight = birdLeft + BIRD_WIDTH;
				if (Math.abs(birdRight - obstacle.left) <= 1) {
					const obstacleTopOfBottomPoint = 80 - obstacle.height;
					const obstacleBottomOfTopPoint = obstacle.height;
					const birdTop = Math.floor(birdBottom + BIRD_HEIGHT);
					if (
						(birdTop > obstacleTopOfBottomPoint && birdRight > obstacle.left) ||
						(birdBottom < obstacleBottomOfTopPoint && birdRight > obstacle.left)
					) {
						obstacleWasHit();
						break;
					}
				}
				if (Math.floor(obstacle.left - birdLeft) === 0) {
					updateScore();
				}
			}
			clearInterval(obstacleInterval);
			obstacleInterval = setInterval(() => {
				setObstacles((prevObstacle) => {
					return prevObstacle.map((obstacle, index) => {
						return {
							...obstacle,
							left:
								obstacle.left < -OBSTACLE_WIDTH
									? screenSizeWidth
									: obstacle.left - 1,
						};
					});
				});
			}, 30);
		}
	}, [
		screenSizeWidth,
		obstacles,
		isGameOver,
		birdBottom,
		birdLeft,
		obstacleWasHit,
		updateScore,
	]);

	return (
		<>
			{obstacles.length > 0
				? obstacles.map((obstacle, index) => {
						return <Obstacle height={obstacle.height} left={obstacle.left} />;
				  })
				: null}
		</>
	);
};

export default Obstacles;
