import "./MainScreen.scss";
import React, { useEffect, useState } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import BirdAnimation from "../BirdAnimation/BirdAnimation";

let birdAnimationInterval: NodeJS.Timeout;
interface MainScreenProps {
	startGame(): void;
}

const MainScreen = ({ startGame }: MainScreenProps) => {
	const keyPressed: boolean = useKeyPress();
	const [isEnabledWingFlap, setIsEnabledWingFlap] = useState(false);

	const startGameHandler = () => {
		startGame();
	};

	useEffect(() => {
		clearInterval(birdAnimationInterval);
		birdAnimationInterval = setInterval(() => {
			setIsEnabledWingFlap((state) => !state);
		}, 500);
	}, [setIsEnabledWingFlap]);
	return (
		<div className='main_screen_layout'>
			<div className='main_screen_title'>Welcome to Flappy Birdo</div>
			<div className='main_screen_animation_container'>
				<BirdAnimation isEnabledWingFlap={isEnabledWingFlap} />
			</div>
			<div
				className={
					!keyPressed
						? "main_screen_instruction_button"
						: "main_screen_instruction_button_pressed"
				}
			></div>
			<div className='main_screen_instruction'>Press Spacebar / Tap to fly</div>
			{keyPressed ? startGameHandler() : null}
		</div>
	);
};

export default MainScreen;
