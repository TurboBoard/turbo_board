import Label from "@Components/inputs/Label";

interface Props {
	handle_change: Function;
	id: string;
	label: string;
	placeholder: string;
	required: boolean;
	value: string;
}

const Textarea = ({ handle_change, id, label, placeholder, required, value }: Props) => (
	<div>
		<Label id={id} required={required} text={label} />

		<textarea
			className="w-full h-40 px-2.5 py-1 border border-primary rounded-md outline-0 bg-body text-sm in-out-smooth focus:border-secondary custom-scrollbar"
			id={id}
			onChange={(e) => handle_change(e.target.value)}
			maxLength={1024}
			placeholder={placeholder}
			required={required}
			value={value}
		/>
	</div>
);

export default Textarea;
