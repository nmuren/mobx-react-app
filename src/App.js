import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {StoreProvider} from "./mobx/store";
import ViewNotes from "./view/Notes";
import ViewAddNote from "./view/AddNote";
import ViewNoteCounter from "./view/NoteCounter";


function App() {
    return (
        <div className="App App-header">
            <StoreProvider>
                <ViewNoteCounter/>
                <ViewNotes/>
                <ViewAddNote/>
            </StoreProvider>
        </div>
    );
}

export default App;
