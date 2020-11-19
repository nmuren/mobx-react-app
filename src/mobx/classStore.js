import React, {createContext} from "react";
import {action, computed, makeObservable, observable} from "mobx";

export const ClassStoreContext = createContext(null);

export const ClassStoreProvider = ({children}) => {
    class Store {
        storeType = "Class Store";
        notes = [{id: 0, text: "Example..."}];
        counter = 3;

        constructor() {
            //Let mobx define the types
            //makeAutoObservable(this);

            //Manually declare each type
            makeObservable(this, {
                storeType: observable.ref,
                notes: observable,
                counter: observable,
                addNote: action,
                removeNote: action,
                incCounter: action,
                decCounter: action,
                noteCount: computed,
                isCounterPositive: computed,
                isNotesEmpty: computed
            });
        }

        addNote =
            newNote => {
                this.notes.push(newNote);
            };
        removeNote =
            key => {
                this.notes = this.notes.filter(note => note.id !== key);
            };
        incCounter =
            () => {
                this.counter++;
            };
        decCounter =
            () => {
                this.counter--;
            };

        get noteCount() {
            return this.notes.length;
        };

        get isCounterPositive() {
            return this.counter >= 0;
        };

        get isNotesEmpty() {
            return this.notes.length > 0;
        };
    }

    const store = new Store();

    return (
        <ClassStoreContext.Provider value={store}>
            {children}
        </ClassStoreContext.Provider>
    );
}