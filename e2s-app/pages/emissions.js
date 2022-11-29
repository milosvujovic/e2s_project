import {createStyles, Loader} from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import LeafIcon from '../public/leafIcon.svg'
import InfoIcon from '../public/info.svg'
import EditIcon from '../public/calendar.svg'
import GraphIcon from '../public/graph.svg'
import FilterIcon from '../public/filter.svg'
import {PageTitle} from "../components/PageTitle";
import {RoundedContainer} from "../components/RoundedContainer";
import {ContainerTitle} from "../components/ContainerTitle";
import React, {useRef, useState} from 'react';
import EmissionsGraph from "../components/EmissionsGraph";
import { MultiSelect } from '@mantine/core';
import TimeRangeSelector from "../components/TimeRangeSelector";
import useSWR from "swr";


const useStyles = createStyles((theme, _params) => ({
	emissionsContentParent:{
		display:"flex",
		gap:"20px 20px",
		alignItems:"flex-start",
		flexWrap:"wrap"
	},
	emissionsBySourceGraphing:{
		margin:"-40px"
	},
	reportSummaryContentParent:{
		width:"100%",
		display:"flex",
		gap:"0 20px"
	},
	DateRangePicker:{
		width:"80px",
	},
	emissionsDataSourceSelector:{
		width:"300px"
	}
}))

function dataSourceMapping(databaseResult){
	return databaseResult
}

export default function Emissions() {
	const { classes } = useStyles();
	const { data, error } = useSWR(`/api/infrastructure`)
	let { allDataSourceOptions } = []

	let [dataSourceValue, setDataSourceValue] = useState([]);
	let [startTimestamp, setStartTimestamp] = useState();
	let [endTimestamp, setEndTimestamp] = useState();

	function getDataSourceOptions(){

		let dataSourceOptions = []

		data.forEach(function (equipment, i){

			let outputDataSources = equipment.outputDataSources

			outputDataSources.forEach(function (dataSource, x){
				let equipmentName = equipment.name.split(".")[1]
				let dataSourcePath = dataSource.energyType + "." + equipmentName
				let labelName = equipmentName + " (" + dataSource.energyType + ")"
				dataSourceOptions.push({value:dataSourcePath.toLowerCase(), label:labelName.toLowerCase()})
			})

		});
		allDataSourceOptions = dataSourceOptions
		return dataSourceOptions;
	}

	return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Emissions"}>

		  <PageTitle title={"Emissions"} icon={LeafIcon}/>

		  <div className={classes.emissionsContentParent}>
			  <RoundedContainer>
				  <ContainerTitle title={"Report Summary"} icon={InfoIcon}/>
				  <div className={classes.reportSummaryContentParent}>
					  <div className={classes.reportSummaryHalf}>
						  <p>Start date: ##/##/####</p>
						  <p>Total usage: 0kWh</p>
					  </div>
					  <div className={classes.reportSummaryHalf}>
						  <p>End date: ##/##/####</p>
						  <p>Total price: £0.00</p>
					  </div>
				  </div>

			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"Change Date and Time"} icon={EditIcon}/>
				  <TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"Filtering"} icon={FilterIcon}/>
				  {
					  !data?
						  <Loader />:
						  <MultiSelect
							  data={getDataSourceOptions()}
							  placeholder="Data sources"
							  value={dataSourceValue}
							  onChange={setDataSourceValue}
							  className={classes.emissionsDataSourceSelector}
						  />
				  }

			  </RoundedContainer>

			  <RoundedContainer>
				  <ContainerTitle title={"Emissions by Source"} icon={GraphIcon}/>
				  <EmissionsGraph className={classes.emissionsBySourceGraphing} startTimestamp={startTimestamp} endTimestamp={endTimestamp} allDataSourceOptions ={allDataSourceOptions} selectedDataSourceOptions={dataSourceValue}/>
			  </RoundedContainer>

		  </div>

	  </AppShellConsole>
  );
}
