import React from "react"
import { useContext } from "react";
import { Appcontext } from "../context/contextuser";

function Search()  {
    
    const {setsearchText} = useContext(Appcontext);

return(
    <div className="search-bar">
        <div className="search-icon-f"><img src="src\components\png's\search.png" className="search-icon"/></div>
        <input type="text" placeholder="type to search..."
        onChange={(event) => setsearchText(event.target.value)}/>
    </div>
)
}

export default Search;