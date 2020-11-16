import React from 'react';
import Search from './components/Search';
import Home from './components/Home';
import Song from './components/Song';
import Artist from './components/Artist';
import Album from './components/Album';
import Playlist from './components/Playlist';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        autoComplete="off"
        onKeyUp={event => event.key === "Enter" && <Search input={event.target.value}/>}
       />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/playlist/:id'
            render={({match, location, history}) => (
              <Playlist match={match} location={location} history={history} />
            )}
          />
          <Route exact path='/artist/:id'
            render={({match, location, history}) => (
              <Artist match={match} location={location} history={history} />
            )}
          />
          <Route exact path='/album/:id'
            render={({match, location, history}) => (
              <Album match={match} location={location} history={history} />
            )}
          />
          <Route exact path='/song/:id'
            render={({match, location, history}) => (
              <Song match={match} location={location} history={history} />
            )}
          />
          <Route>
            <div>
              ERROR 404, PAGE NOT FOUND!
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;