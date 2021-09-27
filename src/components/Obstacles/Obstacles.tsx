import React from "react";
import "./Obstacles.scss";
import { OBSTACLE_GAP, OBSTACLE_WIDTH } from "../../constants/globals";
interface ObstacleProps {
	left: number;
	height: number;
	bottom: number;
}

const Obstacles = (obsProps: ObstacleProps) => {
	const bottomOffset = 5;
	const capWidth = 80;
	const capHeight = 30;
	return (
		<>
			<div
				className='obstacle obstacle_top'
				style={{
					width: `${OBSTACLE_WIDTH}px`,
					height: `${obsProps.height}px`,
					left: `${obsProps.left}px`,
					bottom: `${obsProps.bottom + obsProps.height + OBSTACLE_GAP}px`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${capWidth}px`,
						height: `${capHeight}px`,
						left: `${obsProps.left}px`,
						top: `${obsProps.bottom + obsProps.height + OBSTACLE_GAP}px`,
					}}
				></div>
			</div>
			<div
				className='obstacle obstacle_bottom'
				style={{
					width: `${OBSTACLE_WIDTH}px`,
					height: `${obsProps.height}px`,
					left: `${obsProps.left}px`,
					bottom: `${obsProps.bottom - bottomOffset}px`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${capWidth}px`,
						height: `${capHeight}px`,
						left: `${obsProps.left}px`,
						top: `${obsProps.height}px`,
					}}
				></div>
			</div>
		</>
	);
};

export default Obstacles;
