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

function EnergybySourceArea(){

    const { classes } = useStyles();

    function getOptions(){

        const option = {
            aria: {
                enabled: true,
                decal: {
                    show: true
                }
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
            legend: {
                top: '10%',
                left: 'center',
                data: ['Grid Gas', 'Solar', 'Grid Electricity']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'Grid Gas',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [1720, 1670, 1410, 1100, 1200, 1010, 1100, 1240, 1400, 1234, 1820, 1820]
            },
            {
                name: 'Solar',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [80, 130, 200, 360, 190, 630, 700, 480, 380, 290, 180, 70]
            },
            {
                name: 'Grid Electricity',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'},
                data: [190, 320, 420, 502, 370, 190, 70, 90, 160, 360, 240, 220]
            }]
        };

        return option

    }

    return (
        <div className={classes.graphContainer}>
            {
                <ReactECharts option={getOptions()} style={{height:'303px', width:'100%'}}/>
            }
        </div>
    )

}

export default EnergybySourceArea