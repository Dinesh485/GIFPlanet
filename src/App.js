import './App.scss'

import Search from './components/search'
import Nav from './components/nav'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Gifs from './components/gifs'
import Stickers from './components/stickers'
import { useState } from 'react'


function App() {
  
  const [scrollPosition, setScrollPosition] = useState(null)

 const scrollToTop = () =>{
   window.scrollTo(0, 0)
 
 }
 window.addEventListener('scroll',() => {
  setScrollPosition(window.scrollY)

})
 

 
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

       <button style = {{opacity: scrollPosition > 500 ? 1 : 0 ,pointerEvents: scrollPosition > 500 ? 'all' : 'none', transition: 'opacity 100ms linear'}} onClick = {scrollToTop} className = "scroll-top-button">
       <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
       </button>
       
       </Router>
       
    </div>
  );
}

export default App;
