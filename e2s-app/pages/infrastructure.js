import React, { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";
import EnergyFlowSankeyDiagram from "../components/EnergyFlowSankeyDiagram";
import TimeRangeSelector from "../components/TimeRangeSelector";

const useStyles = createStyles((theme, _params) => ({

}))

export default function Infrastructure() {
	const { classes } = useStyles();

	let [startTimestamp, setStartTimestamp] = useState();
	let [endTimestamp, setEndTimestamp] = useState();

	function getNodeNames() {
		return [ 'Solar', 'Grid Electricity', 'Grid Gas', 'Battery Storage', 'CHP1', 'Electricity', 'Lighting', 'Air Conditioning', 'Power Outlets', 'Heating' ]
	}

	function getNodeLinks() {
		return [ { source: 'Solar', target: 'Electricity', value: 5 }, { source: 'Solar', target: 'Battery Storage', value: 4 }, { source: 'Battery Storage', target: 'Electricity', value: 1 }, { source: 'Grid Electricity', target: 'Electricity', value: 20 }, { source: 'Grid Gas', target: 'CHP1', value: 20 }, { source: 'CHP1', target: 'Electricity', value: 5 }, { source: 'CHP1', target: 'Heating', value: 15 }, { source: 'Electricity', target: 'Lighting', value: 6 }, { source: 'Electricity', target: 'Air Conditioning', value: 15 }, { source: 'Electricity', target: 'Power Outlets', value: 10 }]
	}

	let [nodeNames, setNodeNames] = useState(getNodeNames());
	let [nodeLinks, setNodeLinks] = useState(getNodeLinks());


  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Infrastructure"}>
	  	<TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
			<TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
			<EnergyFlowSankeyDiagram nodeNames={nodeNames} nodeLinks={nodeLinks}/>
	  </AppShellConsole>
  );
}

