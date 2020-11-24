import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Provider} from "./mobx/indexStore";
import NoteCounter from "./view/note/NoteCounter";
import NoteList from "./view/note/NoteList";
import AddNote from "./view/note/AddNote";
import Counter from "./view/counter/Counter";
import CounterStatus from "./view/counter/CounterStatus";
import CounterNonComputeStatus from "./view/counter/CounterNonComputeStatus";
import CounterOperations from "./view/counter/CounterOperations";
import StoreFooter from "./view/StoreFooter";
import Maskoo from "./view/Maskoo";

function App() {
    return (
        <div className="App App-header">
            <Provider>
                <Maskoo/>
                <br/><br/>
                <NoteCounter/>
                <NoteList/>
                <AddNote/>
                <br/><br/>
                <Counter/>
                <CounterStatus/>
                <CounterNonComputeStatus/>
                <CounterOperations/>
                <br/><br/>
                <StoreFooter/>
            </Provider>
        </div>
    );
}

export default App;
