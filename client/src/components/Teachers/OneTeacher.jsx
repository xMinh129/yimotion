import React from 'react';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';

class OneTeacher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);
        this.renderClasses = this.renderClasses.bind(this);
        this.renderLessons = this.renderLessons.bind(this);
    }


    loadData() {
        apiRequest.get('/api/teachers/' + this.props.params.teacher_id, this);

    }

    renderClasses(classes) {
        const listOfClasses = classes.map((clss) =>
            <tr className="row100 body">
                <td className="cell100 column1"><Link to={`/classes/${clss.id}`}>{clss.name}</Link></td>
                <td className="cell100 column2">Ongoing</td>
            </tr>
        );
        return (
            <tbody>{listOfClasses}</tbody>
        )

    }

    renderLessons(lessons) {
        const listOfLessons = lessons.map((lesson) =>
            <tr className="row100 body">
                <td className="cell100 column1"><Link to={`/lessons/${lesson.lessonId}`}>{lesson.name}</Link></td>
                <td className="cell100 column2">{lesson.class.name}</td>
                <td className="cell100 column3">{lesson.subject}</td>
                <td className="cell100 column3">{new Date(lesson.createdAt).toLocaleDateString()} {new Date(lesson.createdAt).toLocaleTimeString()} </td>
                <td className="cell100 column4">Ongoing</td>
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
            const teacher = this.state.data;
            return (

                <Card className="fifty-margin-card">
                    <div className="table-container"><span className="table-title">Search for other teachers <i
                        className="fa fa-search"></i></span></div>
                    <div className="table-container">
                        <span className="section-title underline">Teacher Name:</span>
                        <span className="section-title"> {teacher.name}</span>
                    </div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Class</th>
                                        <th className="cell100 column2">Status</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    {this.renderClasses(teacher.classes)}
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="table-container"><span className="lesson-title underline">Latest lessons</span></div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Lesson</th>
                                        <th className="cell100 column2">Class</th>
                                        <th className="cell100 column3">Subject</th>
                                        <th className="cell100 colum4">Time</th>
                                        <th className="cell100 column5">Status</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    {this.renderLessons(teacher.lessons)}
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

export default OneTeacher;
