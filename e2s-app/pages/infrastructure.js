import React, { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";
import TimeRangeSelector from "../components/TimeRangeSelector";

const useStyles = createStyles((theme, _params) => ({

}))

export default function Infrastructure() {
	const { classes } = useStyles();

	let [startTimestamp, setStartTimestamp] = useState();
	let [endTimestamp, setEndTimestamp] = useState();


  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Infrastructure"}>
	  	<TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
			<TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
	  </AppShellConsole>
  );
}

