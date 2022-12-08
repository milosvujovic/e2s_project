import React, { useState, useEffect } from 'react';
import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';


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

function EnergyFlowSankeyDiagram() {
	const { classes } = useStyles();

	function getNodeNamesData() {

	}
	
	const nodeNames = useSWR(`/api/energy_node_names`);
	const nodeLinks = useSWR(`/api/current_energy_node_links`);

	useEffect(()=> {

		console.log(nodeNames.data)
	}, [nodeNames.data])

	useEffect(()=> {

		console.log(nodeLinks.data)
	}, [nodeLinks.data])



	return(
		// This container will change when Will pushes his standard components
		<div>
			<Text className={classes.title}>Estate Energy Flow</Text>
			{
				!(nodeNames.data && nodeLinks.data)?
				<Loader />
				:
				<ReactECharts className={classes.chart} option={
					{
					  series: {
					    type: 'sankey',
					    layout: 'none',
					    emphasis: {
					      focus: 'adjacency'
					    },
					    label: {
					    	show: true
					    },
					    data: nodeNames.data.map((x) => ({name: x.name})),
					    links: nodeLinks.data.map((x) =>({source: x.from, target: x.to, value: x.value}))
					  }
					}
				}/>
			}
		</div>
	)
}

export default EnergyFlowSankeyDiagram;

