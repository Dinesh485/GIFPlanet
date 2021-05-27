import { NavLink } from "react-router-dom"


const Nav = () => {
    return ( 
        <nav>
          <NavLink exact to = '/' >GIFS</NavLink>
          <NavLink to = '/stickers' >Stickers</NavLink>
        </nav>
     );
}
 
export default Nav; 