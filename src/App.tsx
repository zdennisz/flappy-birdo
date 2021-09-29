import React, { useState } from "react";
import "./App.scss";
import GameScreen from "./components/GameScreen/GameScreen";
import useWindowSize from "./hooks/useWindowSize";
import MainScreen from "./components/MainScreen/MainScreen";

const App = () => {
	// Window size
	const size = useWindowSize();
	const [mainScreen, setMainScreen] = useState(true);

	const startGame = () => {
		setMainScreen(false);
	};

	return (
		<div className='game-container'>
			{mainScreen ? (
				<MainScreen startGame={startGame} />
			) : (
				<GameScreen gameScreenWidth={size.width} />
			)}
		</div>
	);
};

export default App;
