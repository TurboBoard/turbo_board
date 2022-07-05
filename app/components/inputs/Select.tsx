import Select from "react-select";

import Label from "@Components/inputs/Label";

interface Props {
	defaultValue?: {
		label: string;
		value: any;
	};
	id: string;
	handle_change: Function;
	label: string;
	options: {
		label: string;
		value: any;
	}[];
	placeholder: string;
	required: boolean;
	searchable: boolean;
	value?: {
		label: string;
		value: any;
	};
}

const Element = ({ defaultValue, handle_change, id, label, options, placeholder, required, searchable, value }: Props) => (
	<div>
		<Label id={id} required={required} text={label} />

		<Select
			className="react-select"
			classNamePrefix="react-select"
			defaultValue={defaultValue}
			id={id}
			instanceId={id}
			isClearable={!required}
			isSearchable={searchable}
			// @ts-ignore
			onChange={handle_change}
			options={options}
			placeholder={placeholder}
			value={value}
		/>
	</div>
);

export default Element;
