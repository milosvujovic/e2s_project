import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import useSWR from 'swr';

const useStyles = createStyles((theme, _params) => ({
    tmpContainer:{
        background:"white",
        width:"400px",
        paddingTop:"20px"
    },
    graphContainer:{
        width:"100%",
        height:"412px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        position:"relative"
    }
}))

function EnergyBySourceGraph(){
    const { data, error } = useSWR(`/api/energy_by_source_data/?companyId=FED4FC15-ECC5-4957-A330-C1928448A2FE`)
    const { classes } = useStyles();

    function getOptions(){

        if(!data) {
            return
        }

        const formattedData = Object.keys(data).map((key) => {
            return {value:data[key], name:key}
        })

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data:formattedData
                }
            ]
        };
        return option

    }

    return (
        <div className={classes.tmpContainer}>
            <Text align="center" weight="700" size="xl">Energy Usage By Source</Text>
            <div className={classes.graphContainer}>
                {
                    !data?
                    <Loader/>:
                    <ReactECharts option={getOptions()} style={{height:'412px', width:'100%'}}/>
                }
            </div>
        </div>
    )

}

export default EnergyBySourceGraph