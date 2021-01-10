import React from 'react';
import Home from '../src/pages/Sign/Sign';
import Register from '../src/pages/Register/Register';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import Maps from '../src/pages/Map/Map';
import error from '../src/components/Error';
import { Route, Switch } from 'react-router-dom';
function App() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/map" component={Maps} />

            <Route component={error} />
        </Switch>
    );
}

export default App;
