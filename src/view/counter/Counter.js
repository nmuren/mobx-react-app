import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../mobx/indexStore";

const Counter = () => {
    const store = useContext(Context);
    return (<h3>{store.counter}</h3>);
}

export default observer(Counter);