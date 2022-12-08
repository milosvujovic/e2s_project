import React, { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import TempGraph from "../components/TempGraph";
import EnergyFlowSankeyDiagram from "../components/EnergyFlowSankeyDiagram";
import ContractorDirectory from "../components/ContractorDirectory";
import TimeRangeSelector from "../components/TimeRangeSelector";
import { getUser } from '../hooks/useAuth';
import DisplayEnergyCertificate from '../components/DisplayEnergyCertificate';
import pylonIcon from "../public/pylonIcon.svg";
import {PageTitle} from "../components/PageTitle";
import {RoundedContainer} from "../components/RoundedContainer";
import {ContainerTitle} from "../components/ContainerTitle";
import EditIcon from "../public/calendar.svg";
import bookIcon from "../public/book.svg";
import temperatureIcon from "../public/temperature.svg";
import leafIcon from "../public/leafIcon.svg";
import {ContainerFlexParent} from "../components/ContainerFlexParent";

const useStyles = createStyles((theme, _params) => ({

}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Infrastructure({user}) {
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

	  <AppShellConsole title={"Infrastructure"} user={user}>
		  <PageTitle title={"Infrastructure"} icon={pylonIcon}/>

		  <ContainerFlexParent>
			  <RoundedContainer>
				  <ContainerTitle title={"Change Date and Time"} icon={EditIcon}/>
				  <TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"Outdoor Temperature"} icon={temperatureIcon}/>
				  <TempGraph startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"Contractor Directory"} icon={bookIcon}/>
				  <ContractorDirectory/>
			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"DEC"} icon={leafIcon}/>
				  <DisplayEnergyCertificate/>
			  </RoundedContainer>

			  <RoundedContainer>
			  	<EnergyFlowSankeyDiagram nodeNames={nodeNames} nodeLinks={nodeLinks}/>
			  </RoundedContainer>
		  </ContainerFlexParent>

	  </AppShellConsole>
  );
}

