import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import BrowseParent from './components/BrowseParent/BrowseParent';
import ManageProfiles from './components/ManageProfiles/ManageProfiles';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='app'>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            { user ?  <Redirect to={'/browse'} /> : <Login /> }
          </Route>
          <Route exact path='/browse'>
            <BrowseParent />
          </Route>
          <Route exact path='/mychannels'>

          </Route>
          <Route exact path='/profiles/manage'>
            <ManageProfiles />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
