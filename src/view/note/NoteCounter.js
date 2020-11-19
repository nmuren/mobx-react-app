import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../mobx/indexStore";

const NoteCounter = observer(() => {
    const store = useContext(Context);

    return <>
        <h2>Note count: {store.noteCount}</h2>
        {
            store.noteCount > 0 ?
                <cite className="blockquote">Click on elements to delete them.</cite> :
                undefined
        }
    </>
});

export default NoteCounter;