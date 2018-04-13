import Base from './components/Main/Base.jsx';
import HomePage from './components/Main/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import AllClasses from './components/Classes/AllClasses.jsx';
import OneClass from './components/Classes/OneClass.jsx';
import AllTeachers from './components/Teachers/AllTeachers.jsx';
import OneTeacher from './components/Teachers/OneTeacher.jsx';
import AllLessons from './components/Lessons/AllLessons.jsx';
import OneLesson from './components/Lessons/OneLesson.jsx';
import Auth from './modules/Auth';


const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DashboardPage);
                } else {
                    callback(null, HomePage);
                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        },
        {
            path: '/classes',
            component: AllClasses

        },
        {
             path: '/classes/:class_id',
             component: OneClass

        },
        {
            path: '/teachers',
            component: AllTeachers

        },
        {
            path: '/teachers/:teacher_id',
            component: OneTeacher

        },
        {
            path: '/lessons',
            component: AllLessons

        },
        {
            path: '/lessons/:lesson_id',
            component: OneLesson

        }

    ]
};

export default routes;
