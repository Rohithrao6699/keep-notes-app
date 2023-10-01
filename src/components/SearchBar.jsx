import React from "react"
 import { BsSearch } from "react-icons/bs";

import { useContext } from "react";
import { Appcontext } from "../context/contextuser";

function Search()  {

    const {setsearchText} = useContext(Appcontext);

return(
    <div className="search-bar">
        <div className="search-icon-f"><BsSearch  className="search-icon"/></div>
        <input type="text" placeholder="type to search..."
        onChange={(event) => setsearchText(event.target.value)}/>
    </div>
)
}

export default Search;