import { useState } from "react";
import loadingGif from '../images/loading.svg'

const LazyImage = ({url}) => {
    const [isLoading, setIsLoading] = useState(true)

    return ( 
       <div>
           
        <img src={loadingGif} alt=""  style = {{display: isLoading?'block': 'none'}} className = "loadingGif"/>
        <img src={url} alt="" onLoad = {() => setIsLoading(false)} style = {{display: isLoading?'none': 'block'}}/>
       </div>
     );
}
 
export default LazyImage;