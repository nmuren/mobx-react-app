import React, {useContext} from "react";
import {Context} from "../mobx/indexStore";

const StoreFooter = () => {

    const store = useContext(Context);

    return (<div>
            Type of the store: {store.storeType}
        </div>
    )
};

export default StoreFooter;