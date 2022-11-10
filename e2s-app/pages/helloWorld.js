import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import useSWR from 'swr';

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	exampleText:{
		color:"blue"
	}
}))

export default function HelloWorld() {
	const { classes } = useStyles();
	const { data, error } = useSWR('/api/Apple/test')

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"}>
		  <p className={classes.exampleText}>HelloWorld!</p>
		  <h1>
			  {
				  !data ?"Loading":data.location
			  }
		  </h1>
	  </AppShellConsole>
  );
}
