import React, {createContext} from "react";
import {useLocalObservable} from "mobx-react-lite";
import {autorun, reaction} from "mobx";

export const HookStoreContext = createContext(null);

export const HookStoreProvider = (({children}) => {
    // useLocalObservable is a short-hand for:
    // const [state] = useState(() => observable(initializer(), annotations, { autoBind: true }))
    const store = useLocalObservable(() => ({
        storeType: "Local Observable (Hook) Store",
        notes: [{id: 0, text: "Example..."}],
        counter: 3,
        addNote:
            newNote => {
                store.notes.push(newNote);
            },
        removeNote:
            key => {
                store.notes = store.notes.filter(note => note.id !== key);
            },
        incCounter: () => {
            store.counter++;
        },
        decCounter: () => {
            store.counter--;
        },
        get noteCount() {
            return store.notes.length;
        },
        get isCounterPositive() {
            return store.counter >= 0;
        },
        get isNotesEmpty() {
            return store.notes.length > 0;
        }
    }));

    // Triggered whenever an action is performed and this component re-rendered because we used it here
    autorun(() => {
        console.debug("autorun activated for counter -> ", store.counter);
    });

    // Only reacts when specific value is updated
    reaction(
        () => store.notes[0].text,
        () => {
            console.debug("reaction activated for store.notes[0].text -> ", store.notes[0].text);
        });

    return <HookStoreContext.Provider value={store}>{children}</HookStoreContext.Provider>
})
