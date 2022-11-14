import React, { useState, useEffect } from 'react';
import { createStyles, SegmentedControl } from '@mantine/core';
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
	let [timeSelection, setTimeSelection] = useState("1d");

	//By Default show 24 hours of data
	useEffect(() => {
		let now = Math.floor(new Date() / 1000)
		let days;
		switch(timeSelection){
			case "12h":
				days = 0.5;
				break;
			case "1d":
				days = 1;
				break;
			case "7d":
				days = 7;
				break;
			case "1m":
				days = 31;
				break;
		}
		setStartTimestamp(now-(60*60*24*days))
		setEndTimestamp(now)
	}, [timeSelection])

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Infrastructure"}>
		  <SegmentedControl
		  	value={timeSelection}
		  	onChange={setTimeSelection}
	      data={[
	      	{ label: '12 hours', value: '12h'},
	        { label: '1 day', value: '1d' },
	        { label: '7 days', value: '7d' },
	        { label: '1 month', value: '1m' },
	      ]}
	    />
			<TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
	  </AppShellConsole>
  );
}

