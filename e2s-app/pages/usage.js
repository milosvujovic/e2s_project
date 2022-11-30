import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import EnergyBySourceGraph from '../components/EnergyBySourceGraph';

const useStyles = createStyles((theme, _params) => ({

}))

export default function Usage() {
	const {classes} = useStyles();

	return (
		/* HTML page content goes between AppShellConsole tags */
		<AppShellConsole title={"Usage"}>
			<EnergyBySourceGraph/>
		</AppShellConsole>
	);
}

