import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import {Link, IndexLink} from 'react-router';


const HomePage = () => (
    <Card className="homepage-authentication">
        <h1 authentication-title>Welcome</h1>
        <button className="authentication ripple"><Link to="/login">Log in</Link></button>
        <button className="authentication right ripple signup"><Link to="/signup">Register</Link></button>
    </Card>
);

export default HomePage;
