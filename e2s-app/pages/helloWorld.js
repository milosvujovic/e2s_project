import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { useState, useEffect } from 'react';

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	exampleText:{
		color:"blue"
	}
}))

export default function HelloWorld() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { classes } = useStyles();

	useEffect(() => {
		setIsLoading(true);
		fetch('/api/Apple/test')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setIsLoading(false)
			})
	},[])

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"}>
		  <p className={classes.exampleText}>HelloWorld!</p>
		  <h1>
			  {
				  isLoading ?"Loading":data.location
			  }
		  </h1>
	  </AppShellConsole>
  );
}
