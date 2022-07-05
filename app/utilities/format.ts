import { BountyRequirements } from "@Types";

const format = {
	score_to_beat: (score_to_beat: BountyRequirements["score_to_beat"]) => score_to_beat.toLocaleString(),
	time_to_beat: (time_to_beat: BountyRequirements["time_to_beat"]) => {
		const { h, m, s, ms } = time_to_beat;

		let time_string: string = "";

		if (ms > 0) time_string = `${ms}ms`;

		if (s > 0) time_string = `${s}s ${time_string}`;

		if (m > 0) time_string = `${m}m ${time_string}`;

		if (h > 0) time_string = `${h}h ${time_string}`;

		return time_string;
	},
};

export default format;
