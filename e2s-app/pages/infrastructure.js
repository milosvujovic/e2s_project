import React, { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";
import TimeRangeSelector from "../components/TimeRangeSelector";
import { getUser } from '../hooks/useAuth';

const useStyles = createStyles((theme, _params) => ({

}))

export async function getServerSideProps(context) {
  const user = getUser(context.req)

  return { props: { user } }
}

export default function Infrastructure({user}) {
	const { classes } = useStyles();

	let [startTimestamp, setStartTimestamp] = useState();
	let [endTimestamp, setEndTimestamp] = useState();


  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Infrastructure"}>
	  	<TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
		  <TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
		  {user.firstName}
	  </AppShellConsole>
  );
}

