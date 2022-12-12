import { createStyles, SegmentedControl } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';

const useStyles = createStyles((theme, _params) => ({
	timeSelector:{
		position:"relative",
		width:"fit-content"
	},
	DateRangePicker:{
		position:"absolute",
		right:0,
		top:0,
		width:"80px",
	}
}))

function TimeRangeSelector({setStartTimestamp, setEndTimestamp}){
	let [timeSelection, setTimeSelection] = useState("1d");
	
	const { classes } = useStyles();

	//By Default show 24 hours of data
	useEffect(() => {
		let now = Math.floor(new Date() / 1000)
		let days;
		switch(timeSelection){
			case "12h":
				days = 0.5;
				break;
			case "1d":
				days = 1;
				break;
			case "7d":
				days = 7;
				break;
			case "1m":
				days = 31;
				break;
			case "custom":
				datePickerRef.current.click()
				break;
		}
		if(timeSelection != "custom"){
			setStartTimestamp(now-(60*60*24*days))
			setEndTimestamp(now)
		}
	}, [timeSelection])

	const [dateValue, setdateValue] = useState([
    new Date(new Date() - 60*60*24*1000*3),
    new Date(),
  ]);
  const datePickerRef = useRef(null);

  useEffect(()=>{
  	setStartTimestamp(Math.floor(dateValue[0] / 1000))
  	setEndTimestamp(Math.floor(dateValue[1] / 1000)+((60*60*24*1)))
  }, [dateValue])

  return (
  	<div className={classes.timeSelector}>
		  <SegmentedControl
		  	value={timeSelection}
		  	onChange={setTimeSelection}
	      data={[
	      	{ label: 'Last 12 hours', value: '12h'},
	        { label: 'Last 24 hours', value: '1d' },
	        { label: 'Last 7 days', value: '7d' },
	        { label: 'Last month', value: '1m' },
	        { label: 'Custom', value: 'custom'}
	      ]}
	    />
	    <DateRangePicker
	      placeholder="Pick dates range"
	      value={dateValue}
	      onChange={setdateValue}
	      ref={datePickerRef}
	      className={classes.DateRangePicker}
	    />
    </div>
  )

}




export default TimeRangeSelector;