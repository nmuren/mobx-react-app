import React, {useContext} from "react";
import Button from "react-bootstrap/cjs/Button";
import {Context} from "../../mobx/indexStore";

const CounterOperations = () => {

    const store = useContext(Context);
    return (
        <div>
            <Button type="button" variant="danger" onClick={store.decCounter}>Dec</Button>{" "}
            <Button type="button" variant="success" onClick={store.incCounter}>Inc</Button>
        </div>
    );
}

export default CounterOperations;