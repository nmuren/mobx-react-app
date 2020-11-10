import React, {useContext, useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/cjs/Form";
import {StoreContext} from "../mobx/store";

const AddNote = () => {
    const store = useContext(StoreContext);
    const [note, setNote] = useState("");

    return (
        <Form onSubmit={e => {
            store.addNote({
                id: 1 + (Math.random() * (Number.MAX_SAFE_INTEGER - 1)),
                text: note
            });
            setNote("");
            e.preventDefault();
        }}>
            <Form.Control type="text"
                          placeholder="Enter the next one here..."
                          value={note}
                          onChange={e => {
                              setNote(e.target.value);
                          }}/>
            <Button type="submit" variant="primary">Add</Button>
        </Form>
    )
}

export default AddNote;