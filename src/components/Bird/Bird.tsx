import React, { useEffect } from "react";
import "./Bird.scss";
import image from "../../constants/Images";
import { BIRD_HEIGHT, BIRD_WIDTH, GRAVITY } from "../../constants/globals";
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
			<img
				className='bird_image'
				src={isKeyPressed ? image.birdFlappingSrc : image.birdNotFlappingSrc}
				alt='Bird'
			/>
		</div>
	);
};

export default Bird;
