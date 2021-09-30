import React, { useEffect, useCallback, useLayoutEffect } from "react";
import "./Bird.scss";
import {
	BIRD_HEIGHT,
	BIRD_WIDTH,
	GRAVITY,
	BIRD_HEIGHT_HALF,
	BIRD_WIDTH_HALF,
} from "../../constants/globals";
import BirdAnimation from "../BirdAnimation/BirdAnimation";
import useKeyPress from "../../hooks/useKeyPress";
let gameGravityLoop: NodeJS.Timeout;
interface BirdProps {
	birdLeft: number;
	birdBottom: number;
	updateGravityEffectOnBirdBottom: (birdNewBottom: number) => void;
	isGameOver: boolean;
	birdJumpHandler: () => void;
	heightLimit: number;
	hitHandler: () => void;
}

const Bird = ({
	birdLeft,
	birdBottom,
	updateGravityEffectOnBirdBottom,
	isGameOver,
	birdJumpHandler,
	heightLimit,
	hitHandler,
}: BirdProps) => {
	// Falling bird animation
	const isKeyPressed: boolean = useKeyPress();
	const gameOver = useCallback(() => {
		clearInterval(gameGravityLoop);
		hitHandler();
	}, [hitHandler]);

	useLayoutEffect(() => {
		if (!isGameOver) {
			if (birdBottom > BIRD_HEIGHT_HALF) {
				clearInterval(gameGravityLoop);
				gameGravityLoop = setInterval(() => {
					updateGravityEffectOnBirdBottom(birdBottom - GRAVITY);
				}, 30);
			} else {
				gameOver();
			}
		}
	}, [birdBottom, updateGravityEffectOnBirdBottom, gameOver, isGameOver]);

	// Game over restart
	useEffect(() => {
		if (isGameOver) {
			gameOver();
		}
	}, [isGameOver, gameOver]);

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
				width: `${BIRD_WIDTH}vh`,
				height: `${BIRD_HEIGHT}vh`,
				bottom: `${birdBottom - BIRD_HEIGHT_HALF}vh`,
				left: `${birdLeft - BIRD_WIDTH_HALF}vh`,
			}}
		>
			<BirdAnimation isEnabledWingFlap={isKeyPressed && !isGameOver} />
		</div>
	);
};

export default Bird;
