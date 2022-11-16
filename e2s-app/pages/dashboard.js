import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import {Container} from "../components/Container";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */

}))

export default function Dashboard() {
	const { classes } = useStyles();

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"}>
		<h1>Dashboard</h1>
		  <Container>
			  <h3>Inside container</h3>
		  </Container>
	  </AppShellConsole>
  );
}
