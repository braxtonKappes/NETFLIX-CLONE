import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/'>
            
          </Route>
          <Route path='/login'>

          </Route>
          <Route path='/signup'>

          </Route>
          <Route path='/mychannels'>

          </Route>
          <Route path='/mychannels/channelId'>

          </Route>
          <Route path='/browse'>

          </Route>
          <Route path='profiles/manage'>

          </Route>
          <Route path='profiles/:profileId'>

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
