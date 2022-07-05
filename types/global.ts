export type BountyData = {
	created_at: number;
	emulator: boolean;
	id: string;
	meta?: {
		key: MetaData;
		value: MetaData;
	}[];
	platform?: {
		id: number;
		name: string;
	};
	region?: {
		id: number;
		name: string;
	};
	requirements: {
		score_to_beat?: BountyRequirements["score_to_beat"];
		time_to_beat?: BountyRequirements["time_to_beat"];
		tool?: BountyRequirements["tool"];
		trick?: BountyRequirements["trick"];
	};
	type: BountyTypes;
};

export type BountyRequirements = {
	score_to_beat: number;
	time_to_beat: {
		h: number;
		m: number;
		s: number;
		ms: number;
	};
	tool: string;
	trick: string;
};

export type BountyTypes = "time" | "score" | "trick" | "tool";

export type CreateData = {
	emulator: BountyData["emulator"];
	game_id: GameData["id"];
	meta:
		| {
				key: MetaData;
				value: MetaData;
		  }[]
		| null;
	platform_id: number | null;
	region_id: number | null;
	requirements: {
		score_to_beat?: BountyRequirements["score_to_beat"];
		time_to_beat?: BountyRequirements["time_to_beat"];
		tool?: BountyRequirements["tool"];
		trick?: BountyRequirements["trick"];
	};
	type: BountyTypes;
};

export type GameData = {
	companies?: { id: number; name: string }[];
	cover: string;
	id: number;
	name: string;
	platforms: { id: number; name: string }[];
	released: number;
	regions: { id: number; name: string }[];
};

export type MetaData = {
	id: string;
	name: string;
	parent_id?: string;
};

export type Option = {
	children?: {
		label: string;
		value: string;
	}[];
	label: string;
	value: string;
};

export type UserData = {
	id: string;
	image_id: string;
	name: string;
};
