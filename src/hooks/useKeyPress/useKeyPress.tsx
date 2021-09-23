import { useState, useEffect } from "react";
interface KeyPress {
	key: string;
}

const useKeyPress = (keyPress: KeyPress): boolean => {
	const [keyPressed, SetKeyPressed] = useState(false);
	const selectedKey = keyPress.key;

	useEffect(() => {
		const downHandler = ({ key }: KeyboardEvent): void => {
			if (key === selectedKey) {
				SetKeyPressed(true);
				setTimeout(() => {
					SetKeyPressed(false);
				}, 70);
			}
		};

		window.addEventListener("keydown", downHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
		};
	}, [keyPressed, selectedKey]);

	return keyPressed;
};

export default useKeyPress;
