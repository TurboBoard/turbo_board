import Form from "@Components/forms/UserDetails";

const Layout = ({ email }: { email: string | null }) => (
	<div className="container py-10 lg:py-20">
		<h1 className="text-accent">Welcome</h1>

		<Form email={email} />

		<div className="lg:w-1/4">
			<a className="mb-5 lg:mb-10 button button--full" href="/api/auth/logout">
				Log Out
			</a>
		</div>
	</div>
);

export default Layout;
