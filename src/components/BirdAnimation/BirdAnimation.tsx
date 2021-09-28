import React from "react";
import { BIRD_WIDTH, BIRD_HEIGHT } from "../../constants/globals";
interface BirdAnimationProps {
	isEnabledWingFlap: boolean;
}
const BirdAnimation = ({ isEnabledWingFlap }: BirdAnimationProps) => {
	return (
		<svg
			width={BIRD_WIDTH}
			height={BIRD_HEIGHT}
			viewBox='0 0 443 508'
			fill='none'
		>
			<path
				id='head'
				d='M435.269 278.141L415.412 199.771C414.941 197.912 412.378 197.717 411.631 199.483L389.661 251.437C389.28 252.338 389.607 253.384 390.435 253.906L432.262 280.323C433.79 281.288 435.713 279.893 435.269 278.141Z'
				stroke='black'
				strokeWidth='15'
			/>
			<path
				id='neck'
				d='M313.9 194.231L287.761 226.073C287.293 226.644 287.177 227.426 287.459 228.108L339.719 354.202C340.391 355.824 342.679 355.854 343.393 354.25L389.386 251L413.747 196.314C414.336 194.991 413.368 193.5 411.92 193.5H315.446C314.847 193.5 314.28 193.768 313.9 194.231Z'
				stroke='black'
				strokeWidth='15'
			/>
			{isEnabledWingFlap && (
				<path
					id='wing'
					d='M51.8638 8.4705L234.279 101.126C235.239 101.613 235.641 102.774 235.187 103.751L159.905 265.898C159.173 267.473 156.92 267.431 156.247 265.831L49.1144 11.0288C48.3925 9.31184 50.2032 7.627 51.8638 8.4705Z'
					stroke='black'
					strokeWidth='15'
				/>
			)}
			<path
				id='upper-body'
				d='M338.525 353.171L237.738 106.75C237.077 105.133 234.806 105.082 234.072 106.667L159.326 268.216C158.867 269.206 159.288 270.381 160.27 270.856L335.803 355.729C337.454 356.527 339.219 354.869 338.525 353.171Z'
				stroke='black'
				strokeWidth='15'
			/>
			<path
				id='lower-body'
				d='M115.008 422.51L158.416 272.258C158.758 271.074 160.079 270.479 161.193 271.006L341.236 356.245C342.899 357.032 342.706 359.458 340.939 359.973L117.489 424.985C115.975 425.425 114.571 424.024 115.008 422.51Z'
				stroke='black'
				strokeWidth='15'
			/>
			<path
				id='tail'
				d='M100.804 473.047L156.414 277.602C157.041 275.399 154.073 274.043 152.818 275.958L7.95108 496.997C6.93475 498.548 8.39285 500.527 10.1751 500.016L99.4318 474.422C100.096 474.232 100.615 473.712 100.804 473.047Z'
				stroke='black'
				strokeWidth='15'
			/>
		</svg>
		// <img
		// 	className='bird_image'
		// 	src={isKeyPressed ? image.birdFlappingSrc : image.birdNotFlappingSrc}
		// 	alt='Bird'
		// />
	);
};

export default BirdAnimation;