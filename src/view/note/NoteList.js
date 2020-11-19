import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../mobx/indexStore";

const NoteList = observer(() => {
    const store = useContext(Context);

    return (
        <ul>
            {store.notes.map((note) => (
                <li key={note.id} onClick={() => {
                    store.removeNote(note.id);
                }}>{note.text}</li>))}
        </ul>
    )
});

export default NoteList;