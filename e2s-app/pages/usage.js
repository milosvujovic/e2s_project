import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import EnergyBySourceGraph from '../components/EnergyBySourceGraph';
import { getUser } from '../hooks/useAuth';

const useStyles = createStyles((theme, _params) => ({

}))


export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Usage({user}) {
	const { classes } = useStyles();


	return (
		/* HTML page content goes between AppShellConsole tags */
		<AppShellConsole title={"Usage"} user={user}>
			<EnergyBySourceGraph/>
		</AppShellConsole>
	);
}

