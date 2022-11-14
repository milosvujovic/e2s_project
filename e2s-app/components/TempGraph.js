import React, { useState, useEffect } from 'react';

function TempGraph({startTimestamp=null, endTimestamp=null}){
	//If either is null then return error
	if(startTimestamp == null || endTimestamp == null){
		console.warn("Timestamps Not Set")
		return <p>Timestamps not set</p>
	}

	let [data, setData] = useState(null);

	return(
		<>
			<p>temp graph</p>
		</>
	)
}

export default TempGraph;

