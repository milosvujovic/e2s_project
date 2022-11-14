import React, { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	button:{
		border:"1px solid blue"
	}
}))

export default function Infrastructure() {
	const { classes } = useStyles();

	let [startTimestamp, setStartTimestamp] = useState();
	let [endTimestamp, setEndTimestamp] = useState();

	//By Default show 24 hours of data
	useEffect(() => {
		let now = Math.floor(new Date() / 1000)
		setStartTimestamp(now-(60*60*24))
		setEndTimestamp(now)
	}, [])

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Infrastructure"}>
			<TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
	  </AppShellConsole>
  );
}

