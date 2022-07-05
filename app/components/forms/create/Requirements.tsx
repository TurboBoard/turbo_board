import Input from "@Components/inputs/Input";
import Textarea from "@Components/inputs/Textarea";

import Medal from "@Svgs/Medal";
import Timer from "@Svgs/Timer";
import Toolbox from "@Svgs/Toolbox";
import Wand from "@Svgs/Wand";

import { BountyRequirements, BountyTypes } from "@Types";

const ScoreToBeat = ({ active, handle_change }: { active: number; handle_change: Function }) => (
	<Input
		handle_change={(v: string) => {
			let value: number = v ? parseInt(v, 10) : 0;

			handle_change(value);
		}}
		id="score"
		label="High Score"
		min="0"
		placeholder="999999999"
		required={true}
		type="number"
		value={active}
	/>
);

const TimeToBeat = ({
	active,
	handle_change,
}: {
	active: {
		[key: string]: number;
	};
	handle_change: Function;
}) => (
	<div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
		{[
			{
				id: "h",
				label: "Hours",
				max: 9999,
			},
			{
				id: "m",
				label: "Minutes",
				max: 59,
			},
			{
				id: "s",
				label: "Seconds",
				max: 59,
			},
			{
				id: "ms",
				label: "Milliseconds",
				max: 999,
			},
		].map(({ id, label, max }) => (
			<Input
				key={id}
				handle_change={(v: string) => {
					let value: number = v ? parseInt(v, 10) : 0;

					if (value > max) value = max;

					handle_change({
						...active,
						[id]: value,
					});
				}}
				id={id}
				label={label}
				max={max.toString()}
				min="0"
				placeholder={label}
				required={true}
				type="number"
				value={active[id].toString()}
			/>
		))}
	</div>
);

const Tool = ({ active, handle_change }: { active: string; handle_change: Function }) => (
	<Textarea handle_change={handle_change} id="tool" label="Details" placeholder="" required={true} value={active} />
);

const Trick = ({ active, handle_change }: { active: string; handle_change: Function }) => (
	<Textarea handle_change={handle_change} id="trick" label="Details" placeholder="" required={true} value={active} />
);

const Requirements = ({
	requirements,
	set_requirements,
	set_type,
	type,
}: {
	requirements: BountyRequirements;
	set_requirements: Function;
	set_type: Function;
	type: BountyTypes;
}) => {
	return (
		<fieldset>
			<legend className="capitalize">{type} Requirements</legend>

			<div className="flex space-x-2.5 justify-end">
				{[
					{ id: "time", icon: <Timer /> },
					{ id: "score", icon: <Medal /> },
					{ id: "trick", icon: <Wand /> },
					{ id: "tool", icon: <Toolbox /> },
				].map(({ icon, id }) => (
					<button
						key={id}
						className={`h-9 w-9 p-2 ${type === id ? "bg-accent" : "bg-primary"} text-light rounded-full shadow-md hover:bg-secondary`}
						onClick={() => {
							blur();

							set_type(id);
						}}
						type="button"
					>
						{icon}
					</button>
				))}
			</div>

			{type === "time" && (
				<TimeToBeat
					active={requirements.time_to_beat}
					handle_change={(new_time_to_beat: { h: number; m: number; s: number; ms: number }) =>
						set_requirements({ ...requirements, time_to_beat: new_time_to_beat })
					}
				/>
			)}

			{type === "score" && (
				<ScoreToBeat
					active={requirements.score_to_beat}
					handle_change={(new_score_to_beat: number) => set_requirements({ ...requirements, score_to_beat: new_score_to_beat })}
				/>
			)}

			{type === "trick" && (
				<Trick active={requirements.trick} handle_change={(new_trick: string) => set_requirements({ ...requirements, trick: new_trick })} />
			)}

			{type === "tool" && (
				<Tool active={requirements.tool} handle_change={(new_tool: string) => set_requirements({ ...requirements, tool: new_tool })} />
			)}
		</fieldset>
	);
};

export default Requirements;
