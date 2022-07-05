import { useState } from "react";

import SwitchOff from "@Svgs/SwitchOff";
import SwitchOn from "@Svgs/SwitchOn";

import { blur } from "@Utilities";

const ThemeToggle = () => {
	const [theme, set_theme] = useState("light");

	const handle_click = () => {
		const new_theme = theme === "light" ? "dark" : "light";

		document.body.classList.replace(theme, new_theme);

		set_theme(new_theme);

		blur();
	};

	return (
		<button className="h-10 text-light hover:text-secondary" onClick={handle_click}>
			<span className="h-full block dark:hidden">
				<SwitchOn />
			</span>

			<span className="h-full hidden dark:block">
				<SwitchOff />
			</span>
		</button>
	);
};

export default ThemeToggle;
