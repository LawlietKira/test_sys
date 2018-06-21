import React from 'react'
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './src/App'
import TestForm from './src/components/TestForm'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
	    <Route path="/testForm" component={TestForm}/>
    </Route> 
  </Router>
), document.getElementById('root'));