import React, {createContext} from "react";
import {useLocalStore} from "mobx-react-lite";

export const StoreContext = createContext();

export const StoreProvider = (({children}) => {
    const store = useLocalStore(() => ({
        notes: ["Example..."],
        addNote: note => {
            store.notes.push(note)
        },
        removeNote: key => {
            store.notes = store.notes.filter(note =>
                note !== key
            )
        },
        get notesCount() {
            return store.notes.length;
        }
    }));

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
})
