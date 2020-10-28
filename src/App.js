import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';

class App extends React.Component{
    render(){
        return (
            <>
                <div className="links">
                    <Link to="/login">Login</Link>&nbsp;
                    <Link to="/registration">Registration</Link>&nbsp;
                    <Link to="/chat">Chat</Link>
                </div>
                <Switch>
                    <Route path="/login" component={LoginView}/>
                    <Route path="/registration" component={RegistrationView}/>
                    <Route path="/chat" component={ChatView}/>
                    <Redirect from="/" to="/login"/>
                </Switch>
            </>
        );
    }
}

export default App;