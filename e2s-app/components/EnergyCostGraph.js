import { createStyles, Text, Loader } from '@mantine/core';
import ReactECharts from 'echarts-for-react';

const useStyles = createStyles((theme, _params) => ({
    graphContainer:{
        width:"368px",
        height:"303px",
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
                text: 'Monthly Energy Cost (£)'
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
            <div className={classes.graphContainer}>
                {
                    <ReactECharts option={getOptions()} style={{height:'303px', width:'100%'}}/>
                }
            </div>
        </div>
    )

}

export default EnergyCostGraph