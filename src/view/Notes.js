import React, {useContext} from "react";
import {StoreContext} from "../mobx/store";
import {observer} from "mobx-react-lite";

const Notes = observer(() => {
    const store = useContext(StoreContext);

    return (
        <ul>
            {store.notes.map((note) => (
                <li key={note.id} onClick={() => {
                    store.removeNote(note.id);
                }}>{note.text}</li>))}
        </ul>
    )
});

export default Notes;