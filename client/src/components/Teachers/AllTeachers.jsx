import React from 'react';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';

class AllTeachers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);
        this.renderTeacherClasses = this.renderTeacherClasses.bind(this);
    }


    loadData() {
        const formData = `limit=10`;
        apiRequest.post('/api/teachers', this, formData);

    }

    renderTeacherClasses(classes) {
        const listOfClasses = classes.map((clss) =>
            <p><Link to={`/classes/${clss.id}`}>{clss.name}</Link></p>
        );
        return (
            <div>{listOfClasses}</div>
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
            return (
                <Card className="fifty-margin-card">
                    <div className="table-container"><span className="table-title">All Teachers</span><span
                        className="table-title inline">Search <i
                        className="fa fa-search"></i></span></div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Teacher name</th>
                                        <th className="cell100 column2">Class</th>

                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    <tbody>
                                    {this.state.data.map(teacher =>
                                        <tr className="row100 body">
                                            <td className="cell100 column1"><Link
                                                to={`/teachers/${teacher.id}`}>{teacher.name}</Link></td>
                                            <td className="cell100 column2">
                                                {this.renderTeacherClasses(teacher.classes)}
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

export default AllTeachers;


