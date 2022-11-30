import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


const useStyles = createStyles((theme, _params) => ({

}))

function EmissionsGraph({startTimestamp=null, endTimestamp=null, allDataSourceOptions=null, selectedDataSourceOptions=null}){

	const { classes } = useStyles();
	let [data, setData] = useState([]);

	async function getTimeSeriesData(){

		console.log("ALL DATA SOURCES----")
		console.log(allDataSourceOptions)
		console.log("SELECTED DATA SOURCES----")
		console.log(selectedDataSourceOptions)

		if(startTimestamp == null || endTimestamp == null) {
			console.warn("Timestamps Not Set")
			return <p>Timestamps not set</p>
		}

		let promiseList = [];

		if(Object.keys(selectedDataSourceOptions).length == 0 && allDataSourceOptions != null){

			for(let dataSourceOption of allDataSourceOptions){
				let energyType = (dataSourceOption.value.toString()).split(".")[0]
				let equipmentName = dataSourceOption.value.split(".")[1]

				let response = await fetch(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
				promiseList.push(response.json())
			}


		}else{
			for(let dataSourceOption of selectedDataSourceOptions){
				let energyType = dataSourceOption.split(".")[0]
				let equipmentName = dataSourceOption.split(".")[1]

				let response = await fetch(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
				promiseList.push(response.json())
			};
		}

		Promise.all(promiseList).then((v) => {
			setData([...promiseList])
		});
	}

	useEffect(() => {
		getTimeSeriesData()

		console.log("TIMESERIES RESULT----")
		console.log(data)
	}, [startTimestamp, endTimestamp, allDataSourceOptions, selectedDataSourceOptions])

	function getOptions(){

		const option = {

		};
		return option
	}

	return(
		<p>
			{data.length}
		</p>
	)
}

export default EmissionsGraph;

