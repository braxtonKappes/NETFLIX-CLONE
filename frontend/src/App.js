import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import BrowseParent from './components/BrowseParent/BrowseParent';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session?.user);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <div className='app'>
      <Navigation />
      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            {user ? <Login /> : <Redirect to={'/browse'} />}
          </Route>
          <Route path='/browse' exact={true}>
            <BrowseParent />
          </Route>
          <Route path='/signup' exact={true}>

          </Route>
          <Route path='/mychannels' exact={true}>

          </Route>
          <Route path='/mychannels/channelId' exact={true}>

          </Route>
          <Route path='profiles/manage' exact={true}>

          </Route>
          <Route path='profiles/manage/:profileId' exact={true}>

          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;

/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */
