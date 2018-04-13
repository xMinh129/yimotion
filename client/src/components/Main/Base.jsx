import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from '../../modules/Auth';
import SideBar from './SideBar.jsx';


const Base = ({children}) => (

    <div>
        <header id='header'>
            <div className='wrapper'>

                <h1>
                    <a href='#'>
                        Yimotion
                        <abbr>Dashboard</abbr>
                    </a>
                </h1>

                {Auth.isUserAuthenticated() ? (
                    <div>
                        <div id='notifications'>
                            <p className="nav navbar-left-link">
                                <i className="fa fa-user user-icon" aria-hidden="true"></i>
                                {Auth.getUserData().name}
                            </p>
                            <p className="nav"><Link to="/logout">Log out</Link></p>
                        </div>
                    </div>

                ) : (
                    <div id='notifications'>
                        <p className="nav navbar-left-link"><Link to="/login">Log in</Link></p>
                        <p className="nav"><Link to="/signup">Register</Link></p>
                    </div>
                )}

            </div>
        </header>

        <SideBar/>

        {children}

        <footer className='footer'>
            Beta Version
        </footer>

    </div>

);

Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;
