import React from "react";
import "./GameOver.scss";
interface GameOverProps {
	score: number;
	restartGame: () => void;
}

const GameOver = ({ score, restartGame }: GameOverProps) => {
	const retryHandler = () => {
		restartGame();
	};

	return (
		<div className='game_over_container'>
			<div className='score'>Score : {score}</div>
			<div className='game_over_buttons'>
				<button className='game_over_btn' onClick={retryHandler}>
					Retry
				</button>
				<button className='game_over_btn'>Save Score</button>
			</div>
		</div>
	);
};

export default GameOver;
