import Image from "next/image";
import Link from "next/link";

import { GameData } from "@Types";

const Game = ({ companies, cover, id, name, platforms, released }: GameData) => (
	<div className="md:flex md:items-center md:space-x-5 text-center md:text-left">
		<div className="mb-5 md:mb-0">
			<Link href={`/game/${id}`}>
				<a className="inline-block h-32 w-32 overflow-hidden rounded-full shadow-lg hover:opacity-50 focus:opacity-50">
					<Image alt={name} src={cover} width={264} height={374} />
				</a>
			</Link>
		</div>

		<div className="md:flex-1">
			<Link href={`/game/${id}`}>
				<a className="heading block mb-2.5 text-accent text-5xl hover:text-secondary focus:text-secondary">{name}</a>
			</Link>

			<ul className="space-y-1 text-sm">
				<li>
					<strong>Released:</strong> {released}
				</li>
				{companies && (
					<li>
						<strong>Companies:</strong> {companies.map(({ name }) => name).join(", ")}
					</li>
				)}
				<li>
					<strong>Platforms:</strong> {platforms.map(({ name }) => name).join(", ")}
				</li>
			</ul>
		</div>
	</div>
);

export default Game;
