import React, {Component} from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

/****************************  BarChartComp  ******************************/

class BarChart extends Component {
    constructor(props) {
        super(props);

    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {

        var chartData = this.props.chartData;
        var positivePercentage = ((chartData.positive/(chartData.negative + chartData.positive)) * 100 ).toFixed(0);
        var negativePercentage = ((chartData.negative/(chartData.negative + chartData.positive)) * 100 ).toFixed(0);
        //Create the element
        const div = new ReactFauxDOM.Element('div');

        var data = [
            {name: 'positive', 'count': chartData.positive, 'percentage': positivePercentage, color: '#7777ff'},
            {name: 'negative', 'count': chartData.negative, 'percentage': negativePercentage, color: '#ff7f0e'}
        ];

        var width = 540,
            height = 540,
            radius = 200;

        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.count;
            });

        var svg = d3.select(div).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) {
                return d.data.color;
            });

        g.append("text")
            .attr("transform", function (d) {
                var _d = arc.centroid(d);
                _d[0] *= 2.2;	//multiply by a constant factor
                _d[1] *= 2.2;	//multiply by a constant factor
                return "translate(" + _d + ")";
            })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
            .text(function (d) {
                if (d.data.percentage < 8) {
                    return '';
                }
                return d.data.percentage + '%';
            });

        return div.toReact();

    }

}

export default BarChart;