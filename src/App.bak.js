import './App.css';
import React from "react";
import {action, makeObservable, observable} from "mobx";

// The philosophy behind MobX is very simple:
// Anything that can be derived from the application state,
// should be derived. Automatically.

//  Events
//     ↓
//  [ Actions ] ← ----- ← --•
//     ↓ Modify             |
//  [ State ]               ↑
//     ↓ Updates            | Events invoke
//  [ Computed values ]     ↑
//     ↓ Trigger            |
//  [ Reactions ] → --- → --•

// Core concepts:
	// Observable state
	// Computed values
		// Value that will be derived automatically when relevant data
		// is modified.
	// Reactions
		// Like a Computed but produces side effect instead of new value.
	// Actions
		// Changing the state.

	// MobX reacts to any existing observable property that is read during
	// the execution of a tracked function.
	// MobX tracks property access, not values.

// ================================================================================
// mobx-react package =============================================================

// observer(component) : component
// @observer
	// Turn React component into reactive.
	// Wraps render function in autorun.
	// Available in mobx-react package.

// Provider
	// React context provider to pass stores to child components.
	// stores

// inject(storeNames) : wrap(component) : component
// @inject(storeNames)
// @inject(mapStoresToProps(stores) : propsToInject)
	// Connect provider stores to the React component.
	// Wraps component in HOC.
	// Injected stores|props fill be available as plain component's props.



//Ref.: https://gist.github.com/oupirum/98cbc8666dfd9a1e586f005d81503b6b

class TodoItem {
    //The example data fields with changing content
    title = "";
    finished = false;

    constructor(title) {
        //Both makeObservable and makeAutoObservable lines achieves the same task

        //Properties, entire objects, arrays, Maps and Sets can all be made observable.
        makeObservable(this, {
            title: observable,
            finished: observable,
            toggle: action,
            updateTitle: action
        });

        //Automatically make properties, objects, arrays, Maps and Sets observable.
        // makeAutoObservable(this);

        this.title = title;
    }

    //Action definitions of how the data will be updated
    toggle() {
        this.finished = !this.finished;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }
}

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
// const TimerView = observer(({timer}) => <span>Seconds passed: {timer.secondsPassed}</span>);

function App() {
    return (
        <div className="App App-header">
            at
        </div>
    );
}

export default App;
