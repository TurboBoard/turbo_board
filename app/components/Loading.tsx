import { useEffect, useState } from "react";

import Tiger from "@Svgs/Tiger";

const Loading = ({ text }: { text: string }) => {
	const [dots, set_dots] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			set_dots((prev) => {
				if (prev.length >= 3) return "";

				return `${prev}.`;
			});
		}, 750);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative h-[60vh] my-10 lg:my-20">
			<h1 className="absolute top-1/2 left-1/2 text-accent text-center text-6xl transform -translate-x-1/2 -translate-y-1/2">
				{text}
				{dots}
			</h1>

			<div className="flex justify-center h-full opacity-25">
				<Tiger />
			</div>
		</div>
	);
};

export default Loading;
