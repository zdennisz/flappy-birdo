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

	// Check collision
	const checkCollision = useCallback(() => {
		// Iterate over each obstacle and check it it was hit
		if (!isGameOver) {
			obstacles.forEach((obstacle, index) => {
				const obstacleBottomPoint = obstacle.height + BIRD_HEIGHT_HALF;
				const obstacleTopPoint =
					obstacle.height + OBSTACLE_GAP - BIRD_HEIGHT_HALF;

				if (
					(birdBottom > obstacleTopPoint || birdBottom < obstacleBottomPoint) &&
					birdLeft + 10 > obstacle.left
				) {
					obstacleWasHit();
				} else if (obstacle.left === birdLeft + BIRD_HEIGHT_HALF) {
					updateScore();
				} else {
				}
			});
		}
	}, [
		isGameOver,
		birdBottom,
		birdLeft,
		obstacleWasHit,
		obstacles,
		updateScore,
	]);

	// In charge of moving the obstacles and activating the collision check
	useLayoutEffect(() => {
		if (!isGameOver) {
			//checkCollision();
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
			}, 10);
		}
	}, [checkCollision, screenSizeWidth, obstacles, isGameOver]);

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
