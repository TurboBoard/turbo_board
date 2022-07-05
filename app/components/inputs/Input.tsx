import Label from "@Components/inputs/Label";

interface Props {
	disabled?: boolean;
	handle_change: Function;
	id: string;
	label: string;
	max?: string;
	min?: string;
	placeholder: string;
	required: boolean;
	type: string;
	value: string | number;
}

const Input = ({ disabled, handle_change, id, label, max, min, placeholder, required, type, value }: Props) => (
	<div>
		<Label id={id} required={required} text={label} />

		<input
			disabled={disabled || false}
			className="input"
			id={id}
			max={max}
			min={min}
			onChange={(e) => handle_change(e.target.value)}
			placeholder={placeholder}
			required={required}
			type={type}
			value={value}
		/>
	</div>
);

export default Input;
