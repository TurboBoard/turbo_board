import Label from "@Components/inputs/Label";
import ToggleOn from "@Svgs/ToggleOn";
import ToggleOff from "@Svgs/ToggleOff";

import { blur } from "@Utilities";

interface Props {
	handle_change: Function;
	id: string;
	label: string;
	value: boolean;
}

const Radio = ({ handle_change, id, label, value }: Props) => {
	const handle_click = () => {
		blur();

		handle_change(id, !value);
	};

	return (
		<div className="flex items-center space-x-2.5">
			<Label id={id} required={false} text={label} />

			<button
				className={`h-6 mb-1.5 ${value ? "text-accent" : "text-neutral-500"} rotate-180 hover:text-secondary focus:text-secondary`}
				onClick={handle_click}
				type="button"
			>
				{value ? <ToggleOn /> : <ToggleOff />}
			</button>
		</div>
	);
};

export default Radio;
