import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	exampleText:{
		color:"blue"
	}
}))

export default function HelloWorld() {
	const { classes } = useStyles();

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"}>
		  <p className={classes.exampleText}>HelloWorld!</p>
	  </AppShellConsole>
  );
}
