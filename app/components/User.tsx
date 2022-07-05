import Image from "next/image";

import { UserData } from "@Types";

const User = ({ id, image_id, name }: UserData) => (
	<div className="p-5 border border-primary rounded-lg shadow-lg">
		<img
			alt={name}
			className="h-36 w-36 mx-auto mb-5 rounded-full overflow-hidden"
			src={`https://images.turboboard.io/${image_id}.jpg`}
			width={256}
			height={256}
		/>

		<div className="heading text-center text-accent text-2xl">{name}</div>
	</div>
);

export default User;
