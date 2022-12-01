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

function EnergyCostGraph(){

    const { classes } = useStyles();

    function getOptions(){

        const option = {
            title: {
                text: 'Energy Cost (£)'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    } 
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [4010, 4300, 4080, 4306, 4090, 3390, 3030, 3550, 3380, 3628, 4380, 4120],
                type: 'line'}]
        };

        return option

    }

    return (
        <div className={classes.tmpContainer}>
            <Text align="center" weight="700" size="xl">Energy Cost</Text>
            <div className={classes.graphContainer}>
                {
                    <ReactECharts option={getOptions()} style={{height:'303px', width:'100%'}}/>
                }
            </div>
        </div>
    )

}

export default EnergyCostGraph