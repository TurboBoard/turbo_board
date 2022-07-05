import Image from "next/image";
import Link from "next/link";

import Medal from "@Svgs/Medal";
import Timer from "@Svgs/Timer";
import Toolbox from "@Svgs/Toolbox";
import Wand from "@Svgs/Wand";

import { BountyData, GameData } from "@Types";

import { format } from "@Utilities";

const generate_list = (items: { bounty: BountyData; game: GameData }[]) =>
	items.map(({ bounty, game }) => (
		<Link key={bounty.id} href={`/bounty/${bounty.id}`}>
			<a className="relative block sm:flex sm:items-center sm:space-x-5 px-2.5 py-3 border border-primary rounded-lg shadow-md hover:border-secondary hover:bg-secondary hover:text-white group">
				<div className="h-16 w-16 mx-auto mb-2.5 sm:mb-0 overflow-hidden rounded-full shadow-lg">
					<Image alt={game.name} src={game.cover} width={264} height={374} />
				</div>

				<div className="sm:flex-1 text-center sm:text-left overflow-auto custom-scrollbar">
					<div className="heading text-accent text-2xl in-out-smooth group-hover:text-white">{game.name}</div>

					<ul className="sm:flex sm:space-x-2.5 text-sm">
						<li>
							<strong>Platform:</strong> {bounty.platform?.name || "Any"}
						</li>
						<li>
							<strong>Region:</strong> {bounty.region?.name || "Any"}
						</li>
						<li>
							<strong>Emulator:</strong> {bounty.emulator ? "Allowed" : "Not Allowed"}
						</li>
						{bounty.meta &&
							bounty.meta.map(({ key, value }) => (
								<li key={key.id}>
									<strong>{key.name}: </strong> {value.name}
								</li>
							))}
						{bounty.requirements.score_to_beat && (
							<li>
								<strong>High Score: </strong>
								{bounty.requirements.score_to_beat}
							</li>
						)}
						{bounty.requirements.time_to_beat && (
							<li>
								<strong>Time To Beat: </strong>
								{format.time_to_beat(bounty.requirements.time_to_beat)}
							</li>
						)}
					</ul>
				</div>

				<div className="absolute top-5 right-5 sm:static inline-block h-10 w-10 p-2 bg-primary text-white in-out-smooth rounded-full shadow-md group-hover:bg-secondary">
					{bounty.type === "score" && <Medal />}
					{bounty.type === "time" && <Timer />}
					{bounty.type === "tool" && <Toolbox />}
					{bounty.type === "trick" && <Wand />}
				</div>
			</a>
		</Link>
	));

const Bounties = ({ items }: { items: { bounty: BountyData; game: GameData }[] }) => <div className="space-y-5">{generate_list(items)}</div>;

export default Bounties;
