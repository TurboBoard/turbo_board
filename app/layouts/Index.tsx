import Discord from "@Svgs/Discord";
import Tiger from "@Svgs/Tiger";

const Layout = () => (
	<div>
		<div className="container py-10 lg:py-20">
			<div className="md:flex md:flex-row-reverse md:items-center space-y-10 md:space-y-0 md:space-x-10">
				<div className="md:w-1/3 lg:w-1/2">
					<div className="flex justify-center h-96">
						<Tiger />
					</div>
				</div>

				<div className="md:w-2/3 lg:w-1/2">
					<h1 className="text-accent">Video Game Bounties</h1>

					<p>Create, Share and Fund game bounties. Stay tuned...</p>

					<a
						href="https://discord.gg/7cZvW3AZ7M"
						className="button inline-flex items-center border-[#5865F2] bg-[#5865F2]"
						rel="noreferrer"
						target="_blank"
					>
						<span className="block h-4 mr-2.5">
							<Discord />
						</span>
						Come Chat
					</a>
				</div>
			</div>
		</div>
	</div>
);

export default Layout;
