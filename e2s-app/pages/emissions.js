import {createStyles, Loader} from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import LeafIcon from '../public/leafIcon.svg';
import Bubble from '../public/bubble.svg';
import InfoIcon from '../public/info.svg';
import EditIcon from '../public/calendar.svg';
import GraphIcon from '../public/graph.svg';
import FilterIcon from '../public/filter.svg';
import GreekPerson from '../public/greekPerson.svg'
import {PageTitle} from "../components/PageTitle";
import {RoundedContainer} from "../components/RoundedContainer";
import {ContainerTitle} from "../components/ContainerTitle";
import React, {useRef, useState} from 'react';
import EmissionsGraph from "../components/EmissionsGraph";
import { MultiSelect } from '@mantine/core';
import TimeRangeSelector from "../components/TimeRangeSelector";
import useSWR from "swr";
import { getUser } from '../hooks/useAuth';
import Image from "next/image";

const useStyles = createStyles((theme, _params) => ({
    emissionsContentParent:{
        display:"flex",
        gap:"20px 20px",
        alignItems:"flex-start",
        flexWrap:"wrap",
				height:"138px"
    },
    emissionsBySourceGraphing:{
        margin:"-40px"
    },
    DateRangePicker:{
        width:"80px",
    },
    emissionsDataSourceSelector:{
        width:"250px"
    },
    colouredContainer:{
        backgroundColor:"#03527d",
        background: "linear-gradient(250deg, rgba(0,62,96,1) 60%, rgba(4,129,196,1) 100%)",
        borderRadius:"4px",
				height:"138px"
    },
    pageTitleParent:{
        display:"flex",
        alignItems:"center",
        gap:"0 12px",
        marginBottom:"10px"
    },
    pageTitleIcon:{
        width:"23px",
        height:"23px",
        filter: "invert(97%) sepia(48%) saturate(0%) hue-rotate(126deg) brightness(116%) contrast(101%)"
    },
    pageTitleText:{
        color:"#FFFFFF",
        fontSize:"20px",
        fontWeight:"normal",
        marginRight:"20px"
    },
    pageText:{
        color:"#FFFFFF",
        fontSize:"17px",
        fontWeight:"normal",
        marginBottom:"4px",
        marginRight:"20px",
        width:"220px"
    },
    imageSize:{
        width:"150px",
        height:"138px"
    },
    flexColumn:{
        display:"flex",
        flexDirection:"column",
				paddingLeft:"20px",
				paddingTop:"20px",
				paddingBottom:"20px"
    },
    flexRow:{
        display:"flex",
        flexDirection:"row"
    },
    imageFlex:{
        display:"flex",
        justifyContent:"flex-end",
        height:"100%",
        alignItems:"flex-end"
    },
    emissionsFlexRow1:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexGrow:"1",
        columnGap: "10px",
        marginBottom:"10px"
    },
    emissionsReportSummaryReport:{
        height:"30px"
    },
    emissionsGraphParent:{
        width:"100%"
    }
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)
  return { props: { user } }
}

export default function Emissions({user}) {
    const { classes } = useStyles();
    const { data, error } = useSWR(`/api/infrastructure`)
    let { allDataSourceOptions } = []

    let [dataSourceValue, setDataSourceValue] = useState([]);
    let [startTimestamp, setStartTimestamp] = useState();
    let [endTimestamp, setEndTimestamp] = useState();

    function convertUnixToDate(timestamp){
        const date = new Date(timestamp * 1000)
        return (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2))
    }


    function getDataSourceOptions(){

        let dataSourceOptions = []

        data.forEach(function (equipment, i){

            let outputDataSources = equipment.outputDataSources

            outputDataSources.forEach(function (dataSource, x){
                let equipmentName = equipment.name.split(".")[1]
                let dataSourcePath = dataSource.energyType + "." + equipmentName
                let labelName = equipmentName + " (" + dataSource.energyType + ")"
                dataSourceOptions.push({value:dataSourcePath.toLowerCase(), label:labelName.toLowerCase()})
            })

        });
        allDataSourceOptions = dataSourceOptions
        return dataSourceOptions;
    }

    return (
      /* HTML page content goes between AppShellConsole tags */
      <AppShellConsole title={"Emissions"} user={user}>

          <PageTitle title={"Emissions"} icon={LeafIcon}/>

          <div className={classes.emissionsFlexRow1}>
              <RoundedContainer style={{height:"135px"}}>
                  <ContainerTitle title={"Report Summary"} icon={InfoIcon}/>
                  <div className={classes.reportSummaryContentParent}>
                      <p style={{marginTop:"-3px"}}>Start date: {convertUnixToDate(startTimestamp)}</p>
                      <p style={{marginTop:"-3px"}}>End date: {convertUnixToDate(endTimestamp)}</p>
                  </div>

              </RoundedContainer>

              <RoundedContainer>
                  <ContainerTitle title={"Change Date and Time"} icon={EditIcon}/>
                  <TimeRangeSelector setEndTimestamp={setEndTimestamp} setStartTimestamp={setStartTimestamp}/>
              </RoundedContainer>

              <RoundedContainer>
                  <ContainerTitle title={"Filtering"} icon={FilterIcon}/>
                  {
                      !data?
                          <Loader />:
                          <MultiSelect
                              data={getDataSourceOptions()}
                              placeholder="Data sources"
                              value={dataSourceValue}
                              onChange={setDataSourceValue}
                              className={classes.emissionsDataSourceSelector}
                          />
                  }

              </RoundedContainer>
          </div>

          <div>
              <RoundedContainer className={classes.emissionsGraphParent}>
                  <ContainerTitle title={"Emissions by Source"} icon={GraphIcon}/>
                  <EmissionsGraph className={classes.emissionsBySourceGraphing} startTimestamp={startTimestamp} endTimestamp={endTimestamp} allDataSourceOptions ={allDataSourceOptions} selectedDataSourceOptions={dataSourceValue}/>
              </RoundedContainer>
          </div>




      </AppShellConsole>

  );
}
