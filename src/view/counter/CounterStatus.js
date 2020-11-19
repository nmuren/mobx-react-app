import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../mobx/indexStore";

const CounterStatus = observer(() => {

    const store = useContext(Context);
    return <div>{console.debug("Computed rendered")}
        Computed: {store.isCounterPositive ? <span>positive</span> : <span>negative</span>}
    </div>
});

export default CounterStatus;