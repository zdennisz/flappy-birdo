import React, { useState } from "react";
import {
	OBSTACLE_GAP,
	OBSTACLE_WIDTH,
	CAP_HEIGHT,
	CAP_WIDTH,
} from "../../constants/globals";
import "./Obstacle.scss";

interface ObstacleProps {
	height: number;
	bottom: number;
	left: number;
}
const Obstacle = ({ height, bottom, left }: ObstacleProps) => {
	const bottomOffset = 5;

	return (
		<>
			<div
				className='obstacle obstacle_top'
				style={{
					width: `${OBSTACLE_WIDTH}px`,
					height: `${height}px`,
					left: `${left}px`,
					bottom: `${bottom + height + OBSTACLE_GAP}px`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${CAP_WIDTH}px`,
						height: `${CAP_HEIGHT}px`,
						left: `${left}px`,
						bottom: `${bottom + height + OBSTACLE_GAP}px`,
					}}
				></div>
			</div>
			<div
				className='obstacle obstacle_bottom'
				style={{
					width: `${OBSTACLE_WIDTH}px`,
					height: `${height}px`,
					left: `${left}px`,
					bottom: `${bottom - bottomOffset}px`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${CAP_WIDTH}px`,
						height: `${CAP_HEIGHT}px`,
						left: `${left}px`,
						bottom: `${height}px`,
					}}
				></div>
			</div>
		</>
	);
};
export default Obstacle;
