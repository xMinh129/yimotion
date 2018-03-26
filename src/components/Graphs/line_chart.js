import React, {Component} from 'react';

// Import D3 components
var d3 = require('d3');
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;


/****************************  GraphComp  ******************************/

class LineGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 1200,
            height: 400
        }
    }

    render() {

        var lineChartData = this.props.chartData;


        if (typeof lineChartData !== "undefined") {

            var lineChartSeries = [
                    {
                        field: 'negative',
                        name: 'Negative emotion',
                        color: '#ff7f0e'
                    },
                    {
                        field: 'positive',
                        name: 'Positive emotion',
                        color: '#7777ff'
                    }
                ],
                xLineChart = function (d) {
                    return d.taken_at;
                },
                xLineChartScale = 'time',
                xLineChartLabel = "Time",
                yLineChartLabel = "Number of students",
                // set your x range
                xRange = [0, this.state.width];


            lineChartSeries.reverse();


            return (
                <div>
                    <div>
                        <LineChart
                            width={this.state.width}
                            height={this.state.height}
                            data={lineChartData}
                            chartSeries={lineChartSeries}
                            x={xLineChart}
                            xScale={xLineChartScale}
                            xLabel={xLineChartLabel}
                            yLabel={yLineChartLabel}
                            xRange={xRange}
                            yScale={'linear'}

                        />
                    </div>


                </div>

            )

        }

        else {
            return (
                <div></div>
            )
        }

    }

}

export default LineGraph;

