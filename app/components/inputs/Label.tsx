interface Props {
	id: string;
	required: boolean;
	text: string;
}

const Label = ({ id, required, text }: Props) => (
	<label className="block mb-2.5 text-sm text-copy" htmlFor={id}>
		{text}

		{required && <span className="relative -top-1 -right-0.5 text-xs text-neutral-500">*</span>}
	</label>
);

export default Label;
