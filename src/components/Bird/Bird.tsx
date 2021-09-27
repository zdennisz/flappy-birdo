import React, { useEffect } from "react";
import "./Bird.scss";
import image from "../../constants/Images";
import { BIRD_HEIGHT, BIRD_WIDTH, GRAVITY } from "../../constants/globals";
let gameGravityLoop: NodeJS.Timeout;
interface BirdProps {
	left: number;
	isFlapping: boolean;
	birdBottom: number;
	updateBirdBottom: (birdNewBottom: number) => void;
	isGameOver: boolean;
}

const Bird = ({
	left,
	isFlapping,
	birdBottom,
	updateBirdBottom,
	isGameOver,
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

	return (
		<div
			className='bird'
			style={{
				width: `${BIRD_WIDTH}px`,
				height: `${BIRD_HEIGHT}px`,
				bottom: `${birdBottom - BIRD_HEIGHT / 2}px`,
				left: `${left - BIRD_WIDTH / 2}px`,
			}}
		>
			<img
				className='bird_image'
				src={isFlapping ? image.birdFlappingSrc : image.birdNotFlappingSrc}
				alt='Bird'
			/>
		</div>
	);
};

export default Bird;
