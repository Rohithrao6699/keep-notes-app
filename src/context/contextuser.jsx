import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firestore";
export const Appcontext = createContext({});

import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";



function Appcontexts({children}) {

    const[NoteTitle, SetNoteTitle] = useState('')
    const[Notebody, SetNotebody] = useState('')
    const [searchText, setsearchText] = useState('');//for search bar component
    const[Note, SetNote] = useState([ ]);

    let date = new Date();

      //reading notes
      const getnotes = async () => {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const Note = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            SetNote(Note)
            console.log(Note)
      }
      useEffect(() => {
        getnotes()
      }, []);


      //Adding notes
      const handleTitle = (event) => {
        SetNoteTitle(event.target.value)
    }

    const handleBody = (event) => {
        SetNotebody(event.target.value)
    }

    const handleClick = async () => {
        if (NoteTitle.trim().length > 0) { //This is to remove white spaces.
            const newNote = {
                title: NoteTitle,
                body: Notebody,
                date: date.toLocaleDateString(),
                pinned: false,
                edit: false
              }
              try {
                await addDoc(collection(db, "notes"), newNote);
                SetNote((prevNotes) => [...prevNotes, newNote]);
                SetNotebody(''); 
                SetNoteTitle('');
                getnotes()//calling this here again to update the db.
             } catch (error) {
                console.log(error)
             }
          
        }
      }

        //deleting notes
    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "notes", id));
            //checks if note.id != given id,
            //i.e 1 != 3 is true but 3 != 3 is false then this note is excluded the id is the argument.
        SetNote((prevNotes) => prevNotes.filter((note) => note.id !== id));
     } 

     //updating/editing data
     const handleEditclick = async (id) => {
        const updatedNotes = doc(db, "notes", id);
        // Set the "edit" field of the city 'note'
       try {
         await updateDoc(updatedNotes, {
        edit: true
        });
        SetNote((prevNotes) => //we need to update the correct state.
      prevNotes.map((note) =>
        note.id === id ? { ...note, edit: true } : note
      )
    );
       } catch (error) {
        console.log(error)
       }
      };

      const handletitlechange = async (id, newtitle) => {
        const updatednotes = doc(db, "notes", id);
        try {
            await updateDoc(updatednotes, {
            title: newtitle
        });
        SetNote((prevNotes) => 
            prevNotes.map((note) => 
            note.id === id ? {...note, title: newtitle} : note
            ));
        } catch (error) {
            console.log(error)
        }
      }

      const handlebodychange = async (id, newbody) => {
        const updatednotes = doc(db, "notes", id);
        try {
            await updateDoc(updatednotes, {
            body: newbody
        });
        SetNote((prevNotes) => 
            prevNotes.map((note) => 
            note.id === id ? {...note, body: newbody} : note
            ));
        } catch (error) {
            console.log(error)
        }
      }

      const handlesaveClick = async (id) => {
        const updatedNotes = doc(db, "notes", id);
        // Set the "edit" field of the city 'note'
        try {
        await updateDoc(updatedNotes, {
        edit: false
        });
        SetNote((prevNotes) => 
            prevNotes.map((note) =>
            note.id === id ? {...note, edit: false} : note
            )); 
        } catch (error) {
            
        }
        getnotes()
      };
        
       

      //handling pin
      const handlepin = async (id) => {
        const noteToUpdate = Note.find((note) => note.id === id);
        if (noteToUpdate) {
              const updatedNotes = doc(db, "notes", id);
        try {
            await updateDoc(updatedNotes, {
                pinned: !noteToUpdate.pinned,
                });
            SetNote((prevNotes) =>
                prevNotes.map((note) => 
                note.id === id ? {...note, pinned: !noteToUpdate.pinned}: note
                ))
        } catch (error) {
            console.log(error)
        } 
        }
      }

      const pinnednote = Note.filter((note) => note.pinned);
      const unpinnednote = Note.filter((note) => !note.pinned);
      const allnotes = [...pinnednote, ...unpinnednote]
    

      //pagination logic
      const[CurrentPage, setCurrentPage] = useState(1);
      const notePerpage = 6;
      const totalPages = Math.ceil(Note.length/notePerpage);
      const lastindex = CurrentPage * notePerpage;
      const firstindex = lastindex - notePerpage;
      const currentnote = allnotes.slice(firstindex, lastindex);

      const nextpage = () => {
          if(CurrentPage < totalPages) {
          setCurrentPage(CurrentPage + 1)
          }
      }
      const prevpage = () => {
          if(CurrentPage > 1) {
          setCurrentPage(CurrentPage - 1)
          }
      }
       

        //searching - used in .provider
        // const notes = currentnote.filter((note) => {
        //     note.title.toLowerCase().includes(searchText) ||
        //     note.body.toLowerCase().includes(searchText)
        // })  

       

        
    return(
        <Appcontext.Provider value={{
            Note: currentnote.filter((note) => //handling pinning and searchtext
            note.title.toLowerCase().includes(searchText) ||
            note.body.toLowerCase().includes(searchText)), 
            handleTitle, handleBody, handleClick, NoteTitle, Notebody, deleteNote,
            handlesaveClick, handlebodychange, handletitlechange, handleEditclick, handlepin, setsearchText,
            nextpage, prevpage, CurrentPage, totalPages
        }}>
            {children}
        </Appcontext.Provider>
    )
}

export default Appcontexts;
