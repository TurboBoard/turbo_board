import Type from "@Components/Type";

import { BountyData } from "@Types";

import { format } from "@Utilities";

const Item = ({ title, value }: { title: string; value: string }) => (
	<li>
		<div className="text-neutral-700 dark:text-neutral-200 text-sm">{title}</div>

		<div>
			<strong>{value}</strong>
		</div>
	</li>
);

const Bounty = ({ emulator, meta, platform, region, requirements, type }: BountyData) => (
	<div className="relative">
		<h2 className="mb-5 capitalize text-accent">{type} Bounty</h2>

		<ul className="space-y-5 mb-5">
			<Item title="Platform" value={platform?.name || "Any"} />
			<Item title="Region" value={region?.name || "Any"} />
			<Item title="Emulator" value={emulator ? "Allowed" : "Not Allowed"} />
			{meta && meta.map(({ key, value }) => <Item key={key.id} title={key.name} value={value.name} />)}
		</ul>

		{requirements.score_to_beat && (
			<>
				<h3 className="mb-1 capitalize text-accent">Score To Beat</h3>

				<div>
					<strong className="text-3xl">{format.score_to_beat(requirements.score_to_beat)}</strong>
				</div>
			</>
		)}

		{requirements.time_to_beat && (
			<>
				<h3 className="mb-1 capitalize text-accent">Time To Beat</h3>

				<div>
					<strong className="text-3xl">{format.time_to_beat(requirements.time_to_beat)}</strong>
				</div>
			</>
		)}

		{requirements.tool && (
			<>
				<h3 className="mb-1 capitalize text-accent">Details</h3>

				<p className="mb-0">{requirements.tool}</p>
			</>
		)}

		{requirements.trick && (
			<>
				<h3 className="mb-1 capitalize text-accent">Details</h3>

				<p className="mb-0">{requirements.trick}</p>
			</>
		)}
	</div>
);

export default Bounty;
