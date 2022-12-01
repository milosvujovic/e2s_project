import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	button:{
		border:"1px solid blue"
	}
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Settings({user}) {
	const { classes } = useStyles();

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Settings"} user={user}>

	  </AppShellConsole>
  );
}

