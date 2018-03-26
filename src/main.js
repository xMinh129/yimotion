import React from "react";
import ReactDOM from "react-dom";
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
import {Switch} from 'react-router-dom';

import Classes from './components/Classes/all_classes'
import Class from './components/Classes/class'


ReactDOM.render(

  <Router history={browserHistory} >
  	<Switch>
	  <Route exact path="/" component={Classes} />

    <Route exact path="/classes/:class_id" component={Class} />

    </Switch>
  </Router>,

  document.getElementById('main-content-wrapper')

);
