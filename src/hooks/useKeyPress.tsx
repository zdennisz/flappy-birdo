import { useState, useEffect, useCallback } from "react";
import useCheckMobileScreen from "./useCheckMobileScreen";
import Key from "../constants/Key";

const useKeyPress = (): boolean => {
	const [keyPressed, SetKeyPressed] = useState(false);
	const isMobile = useCheckMobileScreen();

	const selectedKey = Key.SpaceBar;

	const downHandler = useCallback(
		({ key }: KeyboardEvent): void => {
			if (key === selectedKey) {
				SetKeyPressed(true);
				setTimeout(() => {
					SetKeyPressed(false);
				}, 70);
			}
		},
		[selectedKey]
	);

	const touchDownHandler = useCallback((): void => {
		SetKeyPressed(true);
		setTimeout(() => {
			SetKeyPressed(false);
		}, 70);
	}, []);

	useEffect(() => {
		if (isMobile) {
			window.addEventListener("touchend", touchDownHandler);
		} else {
			window.addEventListener("keydown", downHandler);
		}

		return () => {
			if (isMobile) {
				window.removeEventListener("touchend", touchDownHandler);
			} else {
				window.removeEventListener("keydown", downHandler);
			}
		};
	}, [isMobile, touchDownHandler, downHandler]);

	return keyPressed;
};

export default useKeyPress;
