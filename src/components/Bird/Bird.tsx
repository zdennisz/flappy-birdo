import React, { useEffect } from "react";
import "./Bird.scss";
import { BIRD_HEIGHT, BIRD_WIDTH, GRAVITY } from "../../constants/globals";
import BirdAnimation from "../BirdAnimation/BirdAnimation";
let gameGravityLoop: NodeJS.Timeout;
interface BirdProps {
	birdLeft: number;
	isKeyPressed: boolean;
	birdBottom: number;
	updateBirdBottom: (birdNewBottom: number) => void;
	isGameOver: boolean;
	birdJumpHandler: () => void;
	heightLimit: number;
}

const Bird = ({
	birdLeft,
	isKeyPressed,
	birdBottom,
	updateBirdBottom,
	isGameOver,
	birdJumpHandler,
	heightLimit,
}: BirdProps) => {
	// Falling bird animation

	const gameOver = () => {
		clearInterval(gameGravityLoop);
	};
	useEffect(() => {
		if (birdBottom > 30) {
			gameGravityLoop = setInterval(() => {
				updateBirdBottom(birdBottom - GRAVITY);
			}, 30);
		} else {
			gameOver();
		}

		return () => {
			clearInterval(gameGravityLoop);
		};
	}, [birdBottom, updateBirdBottom]);

	// Game over restart
	useEffect(() => {
		if (isGameOver) {
			gameOver();
		}
	}, [isGameOver]);

	//check if jump aviliable
	useEffect(() => {
		if (!isGameOver && isKeyPressed && birdBottom < heightLimit) {
			birdJumpHandler();
		}
	}, [isGameOver, isKeyPressed, birdBottom, heightLimit, birdJumpHandler]);

	return (
		<div
			className='bird'
			style={{
				width: `${BIRD_WIDTH}px`,
				height: `${BIRD_HEIGHT}px`,
				bottom: `${birdBottom - BIRD_HEIGHT / 2}px`,
				left: `${birdLeft - BIRD_WIDTH / 2}px`,
			}}
		>
			<BirdAnimation isKeyPressed={isKeyPressed} />
		</div>
	);
};

export default Bird;
