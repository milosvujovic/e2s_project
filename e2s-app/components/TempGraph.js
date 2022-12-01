import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


const useStyles = createStyles((theme, _params) => ({
	tmpContainer:{
		margin: "10px 10px 0 10px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
        background:"white",
        width:"600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
	},
	graphContainer:{
		width:"100%",
		height:"230px",
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
		position:"relative"
	}
}))

function TempGraph({startTimestamp=null, endTimestamp=null}){
	const { data, error } = useSWR(`/api/temp_data?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`)
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
			return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2)
		})
		const values = data.map((row)=>row.value)

		const option = {
		  tooltip: {
		    trigger: 'axis',
		  },
		  xAxis: {
		    type: 'category',
		    boundaryGap: false,
		    data: labels
		  },
		  yAxis: {
		    type: 'value',
		    axisLabel: {
		      formatter: '{value} °C'
		    }
		  },
		  series: [
		    {
		      name: 'Temperature',
		      type: 'line',
		      data: values,
		      showSymbol:false,
		    },
		  ]
		};
		return option
	}

	return(
		// This container will change when Will pushes his standard components
		<div className={classes.tmpContainer}>
			<Text>Temperature</Text>
			<div className={classes.graphContainer}>
				{
					!data?
					<Loader />:
					<ReactECharts option={getOptions()} style={{height: '300px', width:"100%", position:"absolute", left:10}}/>
				}
			</div>
		</div>
	)
}

export default TempGraph;

