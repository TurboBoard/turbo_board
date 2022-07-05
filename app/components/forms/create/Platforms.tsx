import Radio from "@Components/inputs/Radio";
import Select from "@Components/inputs/Select";

const Platforms = ({
	emulator,
	handle_click,
	platform,
	platforms,
	region,
	regions,
}: {
	emulator: boolean;
	handle_click: Function;
	platform: number | null;
	platforms: { id: number; name: string }[];
	region: number | null;
	regions: { id: number; name: string }[];
}) => {
	const platform_options = platforms
		.map(({ id, name }) => ({
			label: name,
			value: id,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	const platform_value = platform_options.find(({ value }) => value === platform);

	const region_options = regions
		.map(({ id, name }) => ({
			label: name,
			value: id,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));

	const region_value = region_options.find(({ value }) => value === region);

	return (
		<fieldset className="xl:grid grid-cols-3 gap-5">
			<legend>Platforms</legend>

			<div className="col-span-2 mb-5 xl:mb-0">
				<Select
					defaultValue={platform_value}
					id="platform"
					handle_change={(new_option: { value: string }) => handle_click("platform_id", new_option?.value || null)}
					label="Optional Platform Requirement"
					options={platform_options}
					placeholder="Any Platform"
					required={false}
					searchable={true}
					value={platform_value}
				/>
			</div>

			<div className="col-span-1 mb-5 sm:mb-0">
				<Select
					defaultValue={region_value}
					id="region"
					handle_change={(new_option: { value: number }) => handle_click("region_id", new_option?.value || null)}
					label="Optional Region Requirement"
					options={region_options}
					placeholder="Any Region"
					required={false}
					searchable={true}
					value={region_value}
				/>
			</div>

			<div className="sm:absolute top-0 right-5">
				<Radio
					handle_change={(id: string, value: boolean) => handle_click("emulator", value)}
					id="emulator"
					label="Allow Emulators:"
					value={emulator}
				/>
			</div>
		</fieldset>
	);
};

export default Platforms;
