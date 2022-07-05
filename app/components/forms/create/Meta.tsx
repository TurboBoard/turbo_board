import { useEffect, useState } from "react";

import Creatable from "@Components/inputs/Creatable";
import Minus from "@Svgs/Minus";
import Plus from "@Svgs/Plus";
import Select from "@Components/inputs/Select";

import { CreateData, Option } from "@Types";

import { blur } from "@Utilities";

const get_options = async (set_options: Function) => {
	const response = await fetch(`/api/meta_data/options`);

	const json = await response.json();

	if (!json.options) return;

	set_options(json.options);
};

const Meta = ({
	active,
	set_meta,
}: {
	active: {
		key: Option | null;
		value: Option | null;
	}[];
	set_meta: Function;
}) => {
	const [options, set_options] = useState([]);

	useEffect(() => {
		get_options(set_options);
	}, []);

	const add_meta = () => {
		blur();

		if (active.length >= 10) return;

		const new_meta = [...active, { key: null, value: null }];

		set_meta(new_meta);
	};

	const handle_change = (i: number, type: "key" | "value", value: { label: string; value: string; __isNew__: boolean }) => {
		let new_meta = [...active];

		/*==========
		Cleared
		==========*/
		if (!value) {
			new_meta[i][type] = null;

			// If the Key was cleared reset the value
			if (type === "key") {
				new_meta[i]["value"] = null;
			}

			set_meta(new_meta);

			return;
		}

		/*==========
		Created
		==========*/
		if (value.__isNew__) {
			new_meta[i][type] = {
				label: value.label,
				value: "new",
			};

			set_meta(new_meta);

			return;
		}

		/*==========
		Selected
		==========*/
		new_meta[i][type] = value;

		// Reset the Value on Key change
		if (type === "key") {
			new_meta[i]["value"] = null;
		}

		set_meta(new_meta);
	};

	const remove_meta = () => {
		blur();

		if (active.length <= 0) return;

		const new_meta = [...active];

		new_meta.pop();

		set_meta(new_meta);
	};

	return (
		<fieldset>
			<legend>Custom Fields</legend>

			<div className="flex sm:justify-end space-x-1.5 mb-2.5 sm:mb-0">
				<button
					className="inline-flex justify-center h-6 w-6 p-1 bg-primary text-light rounded-full hover:bg-secondary focus:bg-secondary"
					disabled={active.length >= 10}
					onClick={add_meta}
					type="button"
				>
					<Plus />
				</button>

				<button
					className="inline-flex justify-center h-6 w-6 p-1 bg-primary text-light rounded-full hover:bg-secondary focus:bg-secondary"
					disabled={active.length <= 0}
					onClick={remove_meta}
					type="button"
				>
					<Minus />
				</button>
			</div>

			{active.map(({ key, value }, i) => {
				const key_options = options.filter((option: Option) => !active.find((e) => e.key?.value === option?.value));

				const value_options = key?.children || [];

				return (
					<div key={i} className="sm:grid grid-cols-2 gap-5 space-y-5 sm:space-y-0 mb-5 last:mb-0">
						<Creatable
							defaultValue={key}
							id={`key-${i}`}
							handle_change={(value: { label: string; value: string; __isNew__: boolean }) => handle_change(i, "key", value)}
							label="Name"
							options={key_options}
							placeholder="Percentage, Difficulty, Seed..."
							required={false}
							searchable={true}
							value={key}
						/>

						<Creatable
							defaultValue={value}
							id={`value-${i}`}
							is_disabled={key ? false : true}
							handle_change={(value: { label: string; value: string; __isNew__: boolean }) => handle_change(i, "value", value)}
							label="Value"
							options={value_options}
							placeholder="Any%, Hard, Random"
							required={false}
							searchable={true}
							value={value}
						/>
					</div>
				);
			})}
		</fieldset>
	);
};

export default Meta;
