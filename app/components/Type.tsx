import Medal from "@Svgs/Medal";
import Timer from "@Svgs/Timer";
import Toolbox from "@Svgs/Toolbox";
import Wand from "@Svgs/Wand";

import { BountyTypes } from "@Types";

const Type = ({ type }: { type: BountyTypes }) => {
	if (type === "score") return <Medal />;

	if (type === "time") return <Timer />;

	if (type === "tool") return <Toolbox />;

	if (type === "trick") return <Wand />;

	return null;
};

export default Type;
