import React, {useContext} from "react";
import {useObserver} from "mobx-react-lite";
import {StoreContext} from "../mobx/store";

const Notes = () => {
    const store = useContext(StoreContext);

    return useObserver(() =>
        (<>
            <h2>Note count: {store.notesCount}</h2>
            <ul>
                {store.notes.map((note, index) => (
                    <li key={index} onClick={() => {
                        store.removeNote(note);
                    }}>{note}</li>))}
            </ul>
        </>)
    )
}
export default Notes