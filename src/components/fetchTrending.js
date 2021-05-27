import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Waypoint } from "react-waypoint";
import LazyImage from "./lazyImage";

const FetchTrending = ({type}) => {
  const [trending, setTrending] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const string = useSelector(state => state.searchString)
  const [searchResult , setSearchResult] = useState([])

  const API_KEY = "etulOKF24ao5wf0tUdlnHjFHdN40BCFM";
  const limit = 10;
  let offset = 0;
  let searchOffset = 0;
  console.log(searchOffset)
  
  const fetchTrending = () => {
    setIsFetching(true)
    axios
    .get(
      `https://api.giphy.com/v1/${type}/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`
    )
    .then((res) => {
      let oldTrending = trending;
      let newTrending = [...oldTrending, ...res.data.data];
      setTrending(newTrending);
      setIsFetching(false)
      
    });     
     
  };
  
  const fetchSearch  = () =>{
    setIsFetching(true)
    axios
    .get(
      `https://api.giphy.com/v1/${type}/search?api_key=${API_KEY}&limit=${limit}&offset=${0}&q=${string}`
    )
    .then((res) => {
      
      let newSearchResult = [ ...res.data.data];
      setSearchResult(newSearchResult);
      setIsFetching(false) 
      
     
    });  
  }
  const fetchSearchWithOffset  = () =>{
    setIsFetching(true)
    axios
    .get(
      `https://api.giphy.com/v1/${type}/search?api_key=${API_KEY}&limit=${limit}&offset=${searchOffset}&q=${string}`
    )
    .then((res) => {
      let oldSearchResult = searchResult
      let newSearchResult = [ ...oldSearchResult,...res.data.data];
      setSearchResult(newSearchResult);
      setIsFetching(false) 
    
     
    });  
  }
  
  
   const trendingList = trending.map((item, index) => {
    offset = index +1
    return (
      <a href={item.url} key={index}>
        <LazyImage url={item.images.fixed_width.webp} />
      </a>
    
    );
  })
   
  const searchList = searchResult.map((item, index) => {
    searchOffset = index +1
   
    return (
      <a href={item.url} key={index}>
        <LazyImage url={item.images.fixed_width.webp} />
      </a>
    
    );
  })

  

  


  useEffect(() => {
    
    fetchTrending();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    
   fetchSearch()
  //eslint-disable-next-line
  },[string]);
 


  return (
    <section className="trending">
      

      <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
      <Masonry
      >
        {string  ? searchList : trendingList}
      </Masonry>
      </ResponsiveMasonry>
        

        
       {isFetching && <p style = {{color: "white", textAlign: 'center', margin: '10px 0'}}>loading.....</p>}
        {!string ?<Waypoint onEnter = {fetchTrending} /> : <Waypoint onEnter = {fetchSearchWithOffset} /> }

    </section>
  );
};

export default FetchTrending;
