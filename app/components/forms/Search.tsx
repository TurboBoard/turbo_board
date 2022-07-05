import { useRouter } from "next/router";

import AsyncSelect from "react-select/async";
import { components, OptionProps, SingleValue } from "react-select";

import { debounce } from "lodash";

import { GameData } from "@Types";

const format_option_label = ({ cover, label, platforms, released }: { cover: string; label: string; platforms: string; released: string }) => (
	<div className="flex items-center space-x-5">
		<img className="h-16 w-16 overflow-hidden rounded-full shadow-md" alt={label} src={cover} height={90} width={90} />

		<div>
			<div className="font-bold">{label}</div>
			<div className="text-sm">{released}</div>
			<div className="text-xs">{platforms}</div>
		</div>
	</div>
);

const get_games = async (query: string) => {
	const response = await fetch(`/api/game_data/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	const json = await response.json();

	if (!json.games) return null;

	return json.games.map(({ cover, id, name, platforms, released }: GameData) => ({
		cover,
		id,
		label: name,
		platforms: platforms
			.map(({ id, name }) => name)
			.sort((a, b) => a.localeCompare(b))
			.join(", "),
		released,
		value: id,
	}));
};

const _load_options = (query: string, callback: (options: []) => void) => {
	get_games(query).then((options) => {
		if (options) {
			return callback(options);
		}
	});
};

const load_options = debounce(_load_options, 250);

const Search = () => {
	const router = useRouter();

	const handle_change = (igdb_id: GameData["id"]) => {
		router.push({
			pathname: "/game/[igdb_id]",
			query: { igdb_id },
		});
	};

	return (
		<AsyncSelect
			cacheOptions={false}
			className="react-select"
			classNamePrefix="react-select"
			defaultOptions={true}
			formatOptionLabel={format_option_label}
			id="igdb-search"
			instanceId="igdb-search"
			isClearable={true}
			isSearchable={true}
			loadOptions={(inputValue: string, callback: (options: []) => void) => load_options(inputValue, callback)}
			noOptionsMessage={({ inputValue }) => {
				if (!inputValue.length) return null;

				return "No games found";
			}}
			onChange={(newValue: any) => {
				if (!newValue || !newValue.id) return;

				handle_change(newValue.id);
			}}
			openMenuOnClick={false}
			placeholder="Search for any game..."
			value={null}
		/>
	);
};

export default Search;
