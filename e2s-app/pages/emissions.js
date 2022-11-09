import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	button:{
		border:"1px solid blue"
	}
}))

export default function Emissions() {
	const { classes } = useStyles();

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Emissions"}>

	  </AppShellConsole>
  );
}

