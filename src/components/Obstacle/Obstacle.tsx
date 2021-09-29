import React from "react";
import {
	OBSTACLE_WIDTH,
	CAP_HEIGHT,
	CAP_WIDTH,
	GAME_SCREEN_SKY_CONTAINER,
	OBSTACLE_GAP,
} from "../../constants/globals";
import "./Obstacle.scss";

interface ObstacleProps {
	height: number;
	left: number;
}
const Obstacle = ({ height, left }: ObstacleProps) => {
	const screenHeight = GAME_SCREEN_SKY_CONTAINER;
	const obstacleBottomHeight = height;
	const obstacleTopHeight =
		GAME_SCREEN_SKY_CONTAINER - OBSTACLE_GAP - obstacleBottomHeight;
	const obstacleBottomOffset = -1;

	const obstacleBottomCapBottom = obstacleBottomHeight - CAP_HEIGHT;
	return (
		<div className='obstacle_container'>
			<div
				className='obstacle obstacle_top'
				style={{
					width: `${OBSTACLE_WIDTH}vh`,
					height: `${obstacleTopHeight}vh`,
					left: `${left}px`,
					bottom: `${screenHeight - obstacleTopHeight}vh`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${CAP_WIDTH}vh`,
						height: `${CAP_HEIGHT}vh`,
						left: `${left}px`,
						bottom: `${obstacleTopHeight}vh`,
					}}
				></div>
			</div>
			<div
				className='obstacle obstacle_bottom'
				style={{
					width: `${OBSTACLE_WIDTH}vh`,
					height: `${obstacleBottomHeight}vh`,
					left: `${left}px`,
					bottom: `${obstacleBottomOffset}vh`,
				}}
			>
				<div
					className='obstacle_cap'
					style={{
						width: `${CAP_WIDTH}vh`,
						height: `${CAP_HEIGHT}vh`,
						left: `${left}px`,
						bottom: `${obstacleBottomCapBottom}vh`,
					}}
				></div>
			</div>
		</div>
	);
};
export default Obstacle;
