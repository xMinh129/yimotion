import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Auth from "../../modules/Auth";

const SideBar = () => (
    <div>
        {Auth.isUserAuthenticated() ? (
            <nav className="main-menu">
                <ul>
                    <li>
                        <a href="#">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                                Overview
                            </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <Link to="/classes">
                            <i className="fa fa-calendar fa-2x"></i>
                            <span className="nav-text">
                                Classes
                            </span>
                        </Link>

                    </li>
                    <li className="has-subnav">
                        <Link to="/teachers">
                            <i className="fa fa-graduation-cap fa-2x"></i>
                            <span className="nav-text">
                                Teachers
                            </span>
                        </Link>

                    </li>
                    <li className="has-subnav">
                        <Link to="/subjects">
                            <i className="fa fa-book fa-2x"></i>
                            <span className="nav-text">
                               Subjects
                            </span>
                        </Link>

                    </li>


                </ul>
                <ul className="logout">
                    <li>
                        <Link to="/logout">
                            <i className="fa fa-power-off fa-2x"></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>

        ) : (
            <div></div>
        )}
    </div>
);

export default SideBar;