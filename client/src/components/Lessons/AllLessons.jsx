import React from 'react';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';

class AllLessons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);

    }


    loadData() {
        const formData = `limit=10`;
        apiRequest.post('/api/lessons', this, formData);

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
            return (
                <Card className="fifty-margin-card">
                    <div className="table-container"><span className="table-title">All Lessons</span><span
                        className="table-title inline">Search <i
                        className="fa fa-search"></i></span></div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Lesson name</th>
                                        <th className="cell100 column2">Class</th>
                                        <th className="cell100 column3">Subject</th>
                                        <th className="cell100 column4">Teacher</th>
                                        <th className="cell100 column5">Time</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    <tbody>
                                    {this.state.data.map(lesson =>
                                        <tr className="row100 body">
                                            <td className="cell100 column1"><Link
                                                to={`/lessons/${lesson.lessonId}`}>{lesson.name}</Link></td>
                                            <td className="cell100 column2">
                                                {lesson.class.name}
                                            </td>
                                            <td className="cell100 column3">
                                                {lesson.subject}
                                            </td>
                                            <td className="cell100 column4">
                                                {lesson.teacher.name}
                                            </td>
                                            <td className="cell100 column5">
                                                {new Date(lesson.createdAt).toLocaleDateString()} {new Date(lesson.createdAt).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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

export default AllLessons;


