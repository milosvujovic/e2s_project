import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


const useStyles = createStyles((theme, _params) => ({

}))

function EmissionsGraph({startTimestamp=null, endTimestamp=null}){
	const { data, error } = useSWR(`/api/usage?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}&IO=output&energyType=electrical&equipment=chp`)
	const { classes } = useStyles();





	//If either is null then return error
	if(startTimestamp == null || endTimestamp == null){
		console.warn("Timestamps Not Set")
		return <p>Timestamps not set</p>
	}

	function getOptions(){

		if(!data){
			return
		}

		const labels = data.map((row)=>{
			const date = new Date(row.timestamp * 1000)
			return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
		})

		const values = data.map((row)=>row.value)

		const option = {
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
					data: [[[EmissionsDateTime]]]
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: 'Burning fuel from fleet vehicles',
					type: 'bar',
					stack: 'scope1',
					emphasis: {
						focus: 'series'
					},
					data: [[[EmissionsBurningFuelFleet]]]
				}

			]
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

