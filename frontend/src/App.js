import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import BrowseParent from './components/BrowseParent/BrowseParent';
import ManageProfiles from './components/ManageProfiles/ManageProfiles';
import MyChannels from './components/MyChannels/MyChannels';
import Footer from './components/Footer/Footer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const session = useSelector(state => state.session);
  const user = session.user
  const userId = user.id

  useEffect(() => {
      dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch, userId]);

  return (
    <div className='app'>
      <Navigation isLoaded={isLoaded}/>
      <Footer />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            { Object.keys(user).length ? <Redirect to={'/browse'} /> : <Login /> }
          </Route>
          <Route exact path='/browse'>
            <BrowseParent />
          </Route>
          {/* <Route exact path='/mychannels/:profileId'>
            <MyChannels />
          </Route> */}
          <Route exact path='/mynotes/:profileId'>
            <MyChannels />
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
