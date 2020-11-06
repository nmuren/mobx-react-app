import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../mobx/store";

const NoteCounter = observer(() => {
    const store = useContext(StoreContext);

    return <h2>Note count: {store.notesCount}</h2>
});
export default NoteCounter