import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './views/auth/login';
import Register from './views/auth/register';
import Home from './views/home/main';
import NewPost from './views/home/newPost';
import './style/App.scss';

function App() {
    return (
        <Router basename={'/'} >
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
                <Route path={`${process.env.PUBLIC_URL}/new_post`} component={NewPost} />


                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />

                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
