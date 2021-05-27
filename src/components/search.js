import {  useState } from "react";
import { useDispatch } from "react-redux";

const Search = () => {
    const [searchString, setSearchString] = useState('');
   const dispatch = useDispatch()
   const handleInput = (e) =>{
       setSearchString(e.target.value)
       dispatch({type: "UPDATE_STRING",payload : e.target.value})
   }
 
    return ( 
        <section className = 'search' id = 'search'>
           <form action="">
               <div className="input-field">
                   <input type="text" placeholder = 'search ' value = {searchString} onChange = {(e) => handleInput(e)} />
                   <button>
                   <svg    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                   </button>
               </div>
           </form>
        </section>
     );
}
 
export default Search;