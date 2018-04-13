import React from 'react';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';

class OneClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }


    loadData() {
        apiRequest.get('/api/classes/' + this.props.params.class_id, this);

    }

    renderLessons(lessons) {
        const listOfLessons = lessons.map((lesson) =>
            <tr className="row100 body">
                <td className="cell100 column1">
                    <Link to={`/lessons/${lesson.lessonId}`}>{lesson.name}</Link></td>
                <td className="cell100 column2">
                    <Link to={`/teachers/${lesson.teacher.id}`}>{lesson.teacher.name}</Link>
                </td>
                <td className="cell100 column3">
                    {lesson.subject}
                </td>
                <td className="cell100 column4">
                    {new Date(lesson.createdAt).toLocaleDateString()} {new Date(lesson.createdAt).toLocaleTimeString()}
                </td>
            </tr>
        );
        return (
            <tbody>{listOfLessons}</tbody>
        )

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
            const clss = this.state.data;
            return (
                <Card className="fifty-margin-card">
                    <div className="table-container"><span className="table-title">Search for other classes <i
                        className="fa fa-search"></i></span></div>
                    <div className="table-container">
                        <span className="section-title underline">Class Name:</span>
                        <span className="section-title"> {clss.name}</span>
                    </div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Lesson</th>
                                        <th className="cell100 column2">Teacher</th>
                                        <th className="cell100 column3">Subject</th>
                                        <th className="cell100 column4">Time</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    {this.renderLessons(clss.lessons)}
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

export default OneClass;

