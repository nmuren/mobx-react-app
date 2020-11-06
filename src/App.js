import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {StoreProvider} from "./mobx/store";
import ViewNotes from "./view/notes";
import ViewAddNote from "./view/addNote";


function App() {
    return (
        <div className="App App-header">
            <StoreProvider>
                <ViewNotes/>
                <ViewAddNote/>
            </StoreProvider>
        </div>
    );
}

export default App;
