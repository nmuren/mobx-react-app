import React, {useContext} from "react";
import {useObserver} from "mobx-react-lite";
import {StoreContext} from "../mobx/store";

const Notes = () => {
    const store = useContext(StoreContext);

    return useObserver(() =>
        (<>
            <h2>Note count: {store.notesCount}</h2>
            <ul>
                {store.notes.map((note) => (
                    <li key={note.id} onClick={() => {
                        store.removeNote(note.id);
                    }}>{note.text}</li>))}
            </ul>
        </>)
    )
}
export default Notes