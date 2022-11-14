import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	button:{
		border:"1px solid blue"
	}
}))

export default function Emissions() {
	const { classes } = useStyles();

	let now = Math.floor(new Date() / 1000)

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Emissions"}>
	  	<TempGraph startTimestamp={now-(60*60*24*31)} endTimestamp={now}/>
	  </AppShellConsole>
  );
}

