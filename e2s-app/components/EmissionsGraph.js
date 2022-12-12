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

		if(Object.keys(selectedDataSourceOptions).length == 0 && allDataSourceOptions != null){

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

		//x Axis Labels
		let xAxisLabels = []

		if(timeSeriesData.length>0 && infrastructureData.length>0){
			xAxisLabels = timeSeriesData[0].Items.map((readingsForDataSource) => {
				let timestamp = readingsForDataSource['timestamp']
				const date = new Date(timestamp * 1000)
				return (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2))
			})
		}

		console.log("Y AXIS VALUES")

		//let allYAxisValues = []

		//y Axis data
		let allYAxisValues = []

		if(timeSeriesData.length>0 && infrastructureData.length>0) {
			allYAxisValues = timeSeriesData.map((dataSource, i) => {
				let kgOfCo2PerUnit = infrastructureData[i]['kgOfCo2PerUnit']

				console.log(dataSource)

				const dataSourceYValues = dataSource.Items.map((reading) => {
					return (reading['value'] * kgOfCo2PerUnit).toFixed(2)
				})

				return {
					name: dataSource.Items[0]['name'],
					values: dataSourceYValues,
					scope: infrastructureData[i]['emissionsScope']
				}
			})
		}

		console.log(allYAxisValues.length)


		return {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			toolbox: {

                feature: {

                    saveAsImage: {}

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
					name: "Time of reading",
					data: xAxisLabels
				}
			],
			yAxis: [
				{
					name: "Co2 (kg)",
					type: 'value'
				}
			],
			series: allYAxisValues.map((row) => {
				return ({
					name: row.name,
						type: 'bar',
						stack: row.scope,
						emphasis: {
						focus: 'series'
					},
					data: row.values
				})
			})
		};

	}

	return(
		<>
			<ReactECharts option={getGraph()} style={{width:"700px"}} notMerge={true}/>
		</>

	)
}

export default EmissionsGraph;

