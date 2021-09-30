import React from "react";
import "./ScoreCounter.scss";
interface ScoreCounterProps {
	score: number;
}

const ScoreCounter = ({ score }: ScoreCounterProps) => {
	return (
		<div className='score_counter_container'>
			<div>{score}</div>
		</div>
	);
};

export default ScoreCounter;
