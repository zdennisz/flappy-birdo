import React from "react";
import "./Obstacles.scss";
interface ObstacleProps {
	left: number;
	width: number;
	height: number;
	gap: number;
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
					width: `${obsProps.width}px`,
					height: `${obsProps.height}px`,
					left: `${obsProps.left}px`,
					bottom: `${obsProps.bottom + obsProps.height + obsProps.gap}px`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${capWidth}px`,
						height: `${capHeight}px`,
						left: `${obsProps.left}px`,
						top: `${obsProps.bottom + obsProps.height + obsProps.gap}px`,
					}}
				></div>
			</div>
			<div
				className='obstacle obstacle_bottom'
				style={{
					width: `${obsProps.width}px`,
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
