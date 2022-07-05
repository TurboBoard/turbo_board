import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";

import Meta from "@Components/forms/create/Meta";
import Platforms from "@Components/forms/create/Platforms";
import Requirements from "@Components/forms/create/Requirements";

import { BountyRequirements, BountyTypes, CreateData, GameData, Option } from "@Types";

interface State {
	emulator: boolean;
	meta: {
		key: Option | null;
		value: Option | null;
	}[];
	platform_id: number | null;
	region_id: number | null;
	requirements: BountyRequirements;
	type: BountyTypes;
}

const Create = ({ create_bounty, game }: { create_bounty: Function; game: GameData }) => {
	const { user } = useUser();

	const [state, set_state] = useState<State>({
		emulator: true,
		meta: [
			{
				key: null,
				value: null,
			},
		],
		platform_id: null,
		requirements: {
			score_to_beat: 0,
			time_to_beat: {
				h: 0,
				m: 0,
				s: 0,
				ms: 0,
			},
			trick: "",
			tool: "",
		},
		region_id: null,
		type: "time",
	});

	const handle_submit = (e: any) => {
		e.preventDefault();

		const meta = state.meta.reduce((acc: CreateData["meta"] | null, { key, value }) => {
			if (!key || !value) return acc;

			if (key.label.length > 256 || value.label.length > 256) {
				return acc;
			}

			const new_meta_data = {
				key: {
					id: key.value,
					name: key.label,
				},
				value: {
					id: value.value,
					name: value.label,
					parent_id: key.value,
				},
			};

			if (acc === null) {
				return [new_meta_data];
			}

			return [...acc, new_meta_data];

			return acc;
		}, null);

		let requirements = {} as CreateData["requirements"];

		if (state.type === "score") {
			requirements.score_to_beat = state.requirements.score_to_beat;
		}

		if (state.type === "time") {
			const total_time = Object.values(state.requirements.time_to_beat).reduce((acc, curr) => acc + curr, 0);

			// TODO: Validate
			if (total_time === 0) return;

			requirements.time_to_beat = state.requirements.time_to_beat;
		}

		if (state.type === "tool") {
			requirements.tool = state.requirements.tool;
		}

		if (state.type === "trick") {
			requirements.trick = state.requirements.trick;
		}

		const create_data: CreateData = {
			emulator: state.emulator,
			game_id: game.id,
			meta,
			platform_id: state.platform_id,
			region_id: state.region_id,
			requirements,
			type: state.type,
		};

		create_bounty(create_data);
	};

	const set_meta = (new_meta: State["meta"]) => {
		set_state({
			...state,
			meta: new_meta,
		});
	};

	return (
		<form onSubmit={handle_submit}>
			<Platforms
				emulator={state.emulator}
				handle_click={(key: string, value: any) => set_state({ ...state, [key]: value })}
				platform={state.platform_id}
				platforms={game.platforms}
				region={state.region_id}
				regions={game.regions}
			/>

			<Meta active={state.meta} set_meta={set_meta} />

			<Requirements
				requirements={state.requirements}
				set_requirements={(new_requirements: BountyRequirements) => set_state({ ...state, requirements: new_requirements })}
				set_type={(new_type: "time" | "score" | "trick" | "tool") => set_state({ ...state, type: new_type })}
				type={state.type}
			/>

			{user ? (
				<button className="button button--full" type="submit">
					Create {state.type} Bounty
				</button>
			) : (
				<a className="button button--full" href="/api/auth/login">
					Please Login to Create a Bounty
				</a>
			)}
		</form>
	);
};

export default Create;
