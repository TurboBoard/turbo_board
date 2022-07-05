import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Layout from "@Layouts/Account";

export default withPageAuthRequired(function Profile({ user }) {
	return <Layout email={user.email || null} />;
});
