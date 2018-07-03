import React from 'react'
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './src/App'
import TestForm from './src/components/TestForm'
import TestAuthority from './src/components/TestAuthority'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<Route path="/authority" component={TestAuthority}/>
	    <Route path="/testForm/:id" component={TestForm}/>
    </Route> 
  </Router>
), document.getElementById('root'));