import React, {createContext} from "react";
import {useLocalObservable} from "mobx-react-lite";

export const StoreContext = createContext(null);

export const StoreProvider = (({children}) => {
    // useLocalObservable is a short-hand for:
    // const [state] = useState(() => observable(initializer(), annotations, { autoBind: true }))

    const store = useLocalObservable(() => ({
        notes: [{
            id: 0,
            text: "Example..."
        }],
        addNote: note => {
            store.notes.push(note)
        },
        removeNote: key => {
            store.notes = store.notes.filter(note =>
                note.id !== key
            )
        },
        get notesCount() {
            return store.notes.length;
        }
    }));

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
})
