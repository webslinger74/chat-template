import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { UserProvider } from './context/userContext';


const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </Router>
)


ReactDOM.render(
         <UserProvider>
                   <Root />
         </UserProvider>
                , document.getElementById('root'));
