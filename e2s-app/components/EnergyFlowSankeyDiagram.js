import React, { useState } from 'react';
import { createStyles, Text } from '@mantine/core';
import ReactECharts from 'echarts-for-react';


const useStyles = createStyles((theme, _params) => ({
	tmpContainer:{
		margin: "10px 10px 0 10px",
		padding: "10px",
		borderRadius: "10px",
		boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
		background:"white",
		width:"530px",
		display: "flex",
		flexDirection: "column",
	},

	title: {
		margin: "15px 0 5px 20px"
	},

	chart: {
		height: "300px",
		width: "500px"
	}
}))

function EnergyFlowSankeyDiagram({nodeNames=null, nodeLinks=null}){
	const { classes } = useStyles();
	
	//If either is null then return error
	if(nodeNames == null || nodeLinks == null){
		console.warn("nodeNames and/or nodeLinks not set")
		return <p>nodeNames and/or nodeLinks not set</p>
	}

	function getOptions(){
		const option = {
		  series: {
		    type: 'sankey',
		    layout: 'none',
		    emphasis: {
		      focus: 'adjacency'
		    },
		    data: nodeNames.map((x)=> ({name: x})),
		    links: nodeLinks
		  }
		};

		return option
	}

	return(
		// This container will change when Will pushes his standard components
		<div className={classes.tmpContainer}>
			<Text className={classes.title}>Estate Energy Flow</Text>
			<ReactECharts className={classes.chart} option={getOptions()}/>
		</div>
	)
}

export default EnergyFlowSankeyDiagram;

