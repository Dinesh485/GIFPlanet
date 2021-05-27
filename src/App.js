import './App.scss'

import Search from './components/search'
import Nav from './components/nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gifs from './components/gifs'
import Stickers from './components/stickers'


function App() {
 
  return (
    
    <div className="App">
      <Router>
       <Search />
       <Nav />
       <Switch>
          <Route exact path = '/'>
            <Gifs />
          </Route>
          <Route path = '/stickers'>
            <Stickers />
          </Route>
       </Switch>
      
       
       </Router>
    </div>
  );
}

export default App;
