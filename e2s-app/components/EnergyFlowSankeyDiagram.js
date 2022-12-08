import React, { useState } from 'react';
import { createStyles, Text } from '@mantine/core';
import ReactECharts from 'echarts-for-react';


const useStyles = createStyles((theme, _params) => ({
	tmpContainer:{
	},

	title: {
		margin: "5px 0 5px 10px"
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
		    label: {
		    	show: true
		    },
		    data: nodeNames.map((x)=> ({id: x, name: 'joe'+x})),
		    links: nodeLinks
		  }
		};

		return option
	}

	return(
		// This container will change when Will pushes his standard components
		<div>
			<Text className={classes.title}>Estate Energy Flow</Text>
			<ReactECharts className={classes.chart} option={getOptions()}/>
		</div>
	)
}

export default EnergyFlowSankeyDiagram;

