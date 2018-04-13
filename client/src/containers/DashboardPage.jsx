import React from 'react';
import Dashboard from '../components/Main/Dashboard.jsx';
import apiRequest from '../api_methods.jsx';


class DashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
            authorizationBox: true
        };
        this.removeAuthorizationWaring = this.removeAuthorizationWaring.bind(this);
    }


    componentDidMount() {
        // Get the dashboard data
        apiRequest.get('/api/dashboard', this);

        // Remove authorization warning box after 3 secs
        setTimeout(this.removeAuthorizationWaring, 3000);
    }

    removeAuthorizationWaring() {
        this.setState({authorizationBox: false});
    }


    render() {
        return (<Dashboard secretData={this.state.data.message}
                           token={localStorage.getItem('token')}
        />);
    }

}

export default DashboardPage;
