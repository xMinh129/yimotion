import React, {Component} from 'react';
import axios from 'axios';

// Import Live Charts
import LineGraph from '../Graphs/line_chart';
import BarChart from '../Graphs/bar_chart';


/****************************  EachClass  ******************************/

class Class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadData: true,
            loadDataByInterval: true
        }
        this.loadDataByInterval = this.loadDataByInterval.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    loadData() {

        const class_id = this.props.match.params.class_id;

        axios
            .get(`/api/classes/${class_id}`)
            .then(resp => {
                var statistics = resp.data.statistics;
                var emotionData = [];
                for (var i = 0; i < statistics.length; i++) {
                    emotionData.push({
                        'taken_at': new Date(statistics[i].taken_at),
                        'positive': statistics[i].emotion_labels.filter(function (x) {
                            return x == 'positive'
                        }).length,
                        'negative': statistics[i].emotion_labels.filter(function (x) {
                            return x == 'negative'
                        }).length
                    });
                }
                this.setState({
                    emotionData: emotionData
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // Setting interval to load the data
    loadDataByInterval() {
        this.setState({
            loadData: true
        });

        this.interval = setInterval(this.loadData, 2000);
    }

    clearDataInterval() {
        this.setState({
            loadData: false
        });

        clearInterval(this.interval);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.loadData();
        this.loadDataByInterval();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidCatch(error) {
        this.setState({error})
    }

    render() {
        if (this.state.emotionData) {
            return (

                <div>
                    <LineGraph
                        chartData={this.state.emotionData}
                    />

                    <BarChart
                        chartData={this.state.emotionData[this.state.emotionData.length - 1]}
                    />

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

export default Class;
