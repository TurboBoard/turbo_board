import Creatable, { useCreatable } from "react-select/creatable";

import Label from "@Components/inputs/Label";

interface Props {
	defaultValue: {
		label: string;
		value: any;
	} | null;
	id: string;
	is_disabled?: boolean;
	handle_change: Function;
	label: string;
	options: {
		label: string;
		value: any;
	}[];
	placeholder: string;
	required: boolean;
	searchable: boolean;
	value: {
		label: string;
		value: any;
	} | null;
}

const Element = ({ defaultValue, handle_change, id, is_disabled, label, options, placeholder, required, searchable, value }: Props) => (
	<div>
		<Label id={id} required={required} text={label} />

		<Creatable
			className="react-select"
			classNamePrefix="react-select"
			defaultValue={defaultValue}
			id={id}
			instanceId={id}
			isClearable={!required}
			isDisabled={is_disabled}
			isSearchable={searchable}
			noOptionsMessage={() => null}
			// @ts-ignore
			onChange={handle_change}
			options={options}
			placeholder={placeholder}
			value={value}
		/>
	</div>
);

export default Element;
