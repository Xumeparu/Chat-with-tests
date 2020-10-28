import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';

class App extends React.Component{
    render(){
        return (
            <>
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