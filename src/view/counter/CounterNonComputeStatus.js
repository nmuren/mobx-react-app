import React, {useContext} from "react";
import {Context} from "../../mobx/indexStore";
import {observer} from "mobx-react-lite";

const CounterNonComputeStatus = observer(() => {

    const store = useContext(Context);
    return <div>{console.debug("Non-Computed rendered")}
        Non-Computed: {store.counter >= 0 ? <span>positive</span> : <span>negative</span>}
    </div>
});

export default CounterNonComputeStatus;