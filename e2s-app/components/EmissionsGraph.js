import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


const useStyles = createStyles((theme, _params) => ({

}))

function EmissionsGraph({startTimestamp=null, endTimestamp=null, allDataSourceOptions=null, selectedDataSourceOptions=null}){

	console.log(allDataSourceOptions)
	console.log(selectedDataSourceOptions)


	if(startTimestamp == null || endTimestamp == null) {
		console.warn("Timestamps Not Set")
		return <p>Timestamps not set</p>
	}

	let urlArray = [];

	console.log("TYPE----")
	console.log(typeof allDataSourceOptions)

	if(Object.keys(selectedDataSourceOptions).length == 0 && allDataSourceOptions != null){
		allDataSourceOptions.forEach(function (dataSourceOption, i){
			let energyType = (dataSourceOption.value.toString()).split(".")[0]
			let equipmentName = dataSourceOption.value.split(".")[1]
			urlArray.push(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
		});

	}else{
		selectedDataSourceOptions.forEach(function (dataSourceOption, i){
			let energyType = dataSourceOption.split(".")[0]
			let equipmentName = dataSourceOption.split(".")[1]
			urlArray.push(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
		});
	}

	const { data } = useSWR([urlArray], arrayFetcher);
	const { classes } = useStyles();


	function arrayFetcher(...urlArr) {
		const f = (u) => fetch(u).then((r) => r.json());
		return Promise.all(urlArr.map(f));
	}


	function getOptions(){

		if(!data){
			return
		}

		console.log(data)

		const option = {

		};
		return option
	}

	return(
		<div>
			{
				!data?
				<Loader />:
					<ReactECharts option={getOptions()}/>
			}
		</div>
	)
}

export default EmissionsGraph;

