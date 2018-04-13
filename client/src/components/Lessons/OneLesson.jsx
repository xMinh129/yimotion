import React from 'react';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';
import {Card} from 'material-ui/Card';


class OneLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);

    }


    loadData() {
        apiRequest.get('/api/lessons/' + this.props.params.lesson_id, this);

    }


    componentDidMount() {
        this.loadData();
    }

    componentWillMount() {

    }

    componentDidUpdate() {

    }

    render() {

        if (this.state.data) {
            const lesson = this.state.data[0];
            return (
                <Card className="fifty-margin-card">
                    <div className="table-container"><span className="table-title">Search for other lessons <i
                        className="fa fa-search"></i></span></div>
                    <div className="table-container">
                        <span className="section-title underline">Lesson Name:</span>
                        <span className="section-title"> {lesson.name}</span>
                        <span className="section-title underline separate-left">Time:</span>
                        <span className="section-title"> {new Date(lesson.createdAt).toLocaleDateString()} {new Date(lesson.createdAt).toLocaleTimeString()}</span>
                        <span className="section-title underline separate-left">Class:</span>
                        <span className="section-title"> {lesson.class.name}</span>
                        <span className="section-title underline separate-left">Subject:</span>
                        <span className="section-title"> {lesson.subject}</span>
                    </div>
                    <div>
                        <iframe width="1000" height="400" src="https://app.powerbi.com/view?r=eyJrIjoiM2E3MzU4NTgtYmY0ZC00YTIxLWE0YTgtNjRkMTdkZGFlMjA5IiwidCI6IjliOGNkNGUyLWQ3ZTgtNDRjOC1hNTlkLWMwYjUwOGNhNGU4NiIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe>
                    </div>
                </Card>

            )
        } else {
            return (
                <LoadingBox/>
            )
        }

    }
}

export default OneLesson;
