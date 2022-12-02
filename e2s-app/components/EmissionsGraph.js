import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


const useStyles = createStyles((theme, _params) => ({

}))

function EmissionsGraph({startTimestamp=null, endTimestamp=null, allDataSourceOptions=null, selectedDataSourceOptions=null}){

	const { classes } = useStyles();
	let [timeSeriesData, setTimeSeriesData] = useState([]);
	let [infrastructureData, setInfrastructureData] = useState([]);

	async function getTimeSeriesAndInfrastructureData(){

		console.log("SELECTED DATA SOURCES----")
		console.log(selectedDataSourceOptions)

		if(startTimestamp == null || endTimestamp == null) {
			console.warn("Timestamps Not Set")
			return <p>Timestamps not set</p>
		}

		let timeSeriesDataPromiseList = [];
		let emissionsDataPromiseList = [];
		setTimeSeriesData([])
		setInfrastructureData([])

		console.log("TIME SERIES BEFORE FETCHES----")
		console.log(timeSeriesData)
		console.log("INFA BEFORE FETCHES----")
		console.log(infrastructureData)

		if(Object.keys(selectedDataSourceOptions).length == 0 && allDataSourceOptions != null && false==true){

			for(let dataSourceOption of allDataSourceOptions){
				let energyType = (dataSourceOption.value.toString()).split(".")[0]
				let equipmentName = dataSourceOption.value.split(".")[1]

				let timeSeriesDataResponse = await fetch(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
				timeSeriesDataPromiseList.push(timeSeriesDataResponse.json())

				let infrastructureResponse = await fetch(`/api/infrastructure?equipment=` + equipmentName + `&IO=output&energyType=` + energyType)
				emissionsDataPromiseList.push(infrastructureResponse.json())
			}


		}else{
			for(let dataSourceOption of selectedDataSourceOptions){
				let energyType = dataSourceOption.split(".")[0]
				let equipmentName = dataSourceOption.split(".")[1]

				let timeSeriesDataResponse = await fetch(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=`+ energyType + `&equipment=` + equipmentName)
				timeSeriesDataPromiseList.push(timeSeriesDataResponse.json())

				let infrastructureResponse = await fetch(`/api/infrastructure?equipment=` + equipmentName + `&IO=output&energyType=` + energyType)
				emissionsDataPromiseList.push(infrastructureResponse.json())
			};
		}

		Promise.all(timeSeriesDataPromiseList).then((v) => {
			setTimeSeriesData([...v])
		});

		Promise.all(emissionsDataPromiseList).then((v) => {
			setInfrastructureData([...v])
		});
	}

	useEffect(() => {
		getTimeSeriesAndInfrastructureData()
	}, [startTimestamp, endTimestamp, allDataSourceOptions, selectedDataSourceOptions])

	function getGraph(){

		console.log("TIME SERIES AFTER FETCHES----")
		console.log(timeSeriesData)
		console.log("INFA AFTER FETCHES----")
		console.log(infrastructureData)

		let graph = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					axisLabel: true,
					data: []
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: []
		};



		if(timeSeriesData.length != 0 && infrastructureData.length != 0){

			//x Axis Labels
			let xAxisLabels = []
			let firstDataSource = timeSeriesData[0].Items

			firstDataSource.forEach(function(readingsForDataSource){
				let timestamp = readingsForDataSource['timestamp']
				const date = new Date(timestamp * 1000)
				xAxisLabels.push(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2))
			})

			graph.xAxis[0]['data'] = xAxisLabels

			console.log("Y AXIS VALUES")

			//y Axis Labels
			timeSeriesData.forEach(function(dataSource){
				let yAxisValues = []
				let count = 0
				let kgOfCo2PerUnit = infrastructureData[count]['kgOfCo2PerUnit']

				dataSource.Items.forEach(function(reading){
					yAxisValues.push(reading['value']*kgOfCo2PerUnit)
				})

				console.log(yAxisValues)

				graph.series.push({
					name: dataSource.Items[0]['name'],
					type: 'bar',
					stack: 'scope1',
					emphasis: {
						focus: 'series'
					},
					data: yAxisValues
				})

				count += 1
			})

			console.log(graph)

			return graph

		}else{
			return {}
		}

	}

	return(
		<>
			<p>{timeSeriesData.length}</p>

		</>

	)
}

export default EmissionsGraph;

