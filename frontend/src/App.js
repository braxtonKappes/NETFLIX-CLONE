import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
// import Navigation from './components/Navigation';
import MovieRows from './components/MovieRows/MovieRows';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>

          </Route>
          <Route path='/login' exact={true}>

          </Route>
          <Route path='/signup' exact={true}>

          </Route>
          <Route path='/mychannels' exact={true}>

          </Route>
          <Route path='/mychannels/channelId' exact={true}>

          </Route>
          <Route path='/browse' exact={true}>
            < MovieRows/>
          </Route>
          <Route path='profiles/manage' exact={true}>

          </Route>
          <Route path='profiles/:profileId' exact={true}>

          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */
