import React from "react"
import { useContext } from "react";
import { Appcontext } from "./context/contextuser";
import NoteStorage from "./components/NoteStorage";
import PopupDrill from "./components/Popup"
import { useState } from "react";
import Search from "./components/SearchBar";


function App() {

  const {nextpage, prevpage, CurrentPage, totalPages} = useContext(Appcontext)

  //popup for propdrill
  const [popup, setpopup] = useState(false)


  return (
    <div className="container">

      <div className="header-content">
      <h1 className="header-app">Keep Notes</h1> 
      <button className="prop-drill" onClick={() => setpopup(true)}>
      Context Api </button>
      </div>
      {popup && 
      <PopupDrill setpopup={setpopup} trigger={popup}>                
      <p className='popup-p'>This application uses Context Api for managing state</p>
      </PopupDrill>}

      <Search/>

      <NoteStorage />

      {/* //pagnation control */}
      <div className="page-btn">
        <button onClick={prevpage} disabled={CurrentPage === 1} className="prev-btn">Prev</button>
        <button onClick={nextpage} disabled={CurrentPage === totalPages} className="next-btn">Next</button>
      </div>
    
    </div>
  )
}
  


export default App;