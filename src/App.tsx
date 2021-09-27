import React, { useEffect, useState, useRef } from "react";
import "./App.scss";
import GameScreen from "./components/GameScreen/GameScreen";
import useWindowSize from "./hooks/useWindowSize";
import MainScreen from "./components/MainScreen/MainScreen";
import useCheckMobileScreen from "./hooks/useCheckMobileScreen";

const App = () => {
	//obstacle sizes
	let obsHeight = useRef(300);
	const isMobile = useCheckMobileScreen();

	// Window size
	const size = useWindowSize();
	const [mainScreen, setMainScreen] = useState(true);

	const startGame = () => {
		setMainScreen(false);
	};

	useEffect(() => {
		if (isMobile) {
			obsHeight.current = 150;
		} else {
			obsHeight.current = 300;
		}
	}, [size.width, obsHeight, isMobile]);

	return (
		<div className='game-container'>
			{mainScreen ? (
				<MainScreen startGame={startGame} />
			) : (
				<GameScreen
					gameScreenHeight={size.height}
					gameScreenWidth={size.width}
					obsHeight={obsHeight.current}
				/>
			)}
		</div>
	);
};

export default App;
