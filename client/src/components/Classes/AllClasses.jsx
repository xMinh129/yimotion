import React from 'react';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';

class Classes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.loadData = this.loadData.bind(this);
        this.renderClassTeachers = this.renderClassTeachers.bind(this);
    }


    loadData() {
        const formData = `limit=10`;
        apiRequest.post('/api/classes', this, formData);

    }

    renderClassTeachers(teachers) {
        const listOfTeachers = teachers.map((teacher) =>
            <p><Link to={`/teachers/${teacher.id}`}>{teacher.name}</Link></p>
        );
        return (
            <div>{listOfTeachers}</div>
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
                    <div className="table-container"><span className="table-title">All Classes</span><span
                        className="table-title inline">Search <i
                        className="fa fa-search"></i></span></div>
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Class name</th>
                                        <th className="cell100 column2">Teacher</th>

                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    <tbody>
                                    {this.state.data.map(clss =>
                                        <tr className="row100 body">
                                            <td className="cell100 column1"><Link
                                                to={`/classes/${clss.id}`}>{clss.name}</Link></td>
                                            <td className="cell100 column2">
                                                {this.renderClassTeachers(clss.teachers)}
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

export default Classes;


