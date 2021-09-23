import "./MainScreen.scss";
import React from "react";
import useKeyPress from "../../hooks/useKeyPress/useKeyPress";
interface MainScreenSettings {
	startGame(): void;
}

const MainScreen = (mainScreen: MainScreenSettings) => {
	const keyPressed: boolean = useKeyPress({ key: " " });

	const startGameHandler = () => {
		mainScreen.startGame();
	};

	return (
		<div className='main_screen_layout'>
			<div className='main_screen_title'>Welcome to Flappy Birdo</div>
			<div className='main_screen_logo'>Some Image to be placed here</div>
			<div className='main_screen_instruction'>Press Spacebar/Tap to fly</div>
			{keyPressed ? startGameHandler() : null}
		</div>
	);
};

export default MainScreen;
