import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import client from './config/graphql'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import Create from './pages/Create'
import Favorite from './pages/Favorites'
import EditMovie from './pages/EditMovie'

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/movies" component={Movies}/>
              <Route path="/movies/:id" component={EditMovie}/>
              <Route path="/tv_series" component={TvSeries}/>
              <Route path="/favorite" component={Favorite}/>
              <Route path="/create" component={Create}/>
            </Switch>
          </Router>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
