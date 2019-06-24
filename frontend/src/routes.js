import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Feed from './pages/Feed';
import News from './pages/News';

function Routes(){
    return(
        <Switch>
            <Route path="/" exact component ={Feed}/>
            <Route path="/news" exact component ={News}/>
        </Switch>
    )
}

export default Routes;