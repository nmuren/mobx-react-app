import {HookStoreContext, HookStoreProvider} from "./hookStore";
import {ClassStoreContext, ClassStoreProvider} from "./classStore";

//# region logging mobx
import {enableLogging} from 'mobx-logger';

const config = {
    action: true,
    reaction: true,
    transaction: false,
    compute: true
};
enableLogging(config);
//# endregion logging mobx

const CLASS_TYPE = true;

//#region store declaration
let context;
let provider;

if (CLASS_TYPE) {
    context = ClassStoreContext;
    provider = ClassStoreProvider;
} else {
    context = HookStoreContext;
    provider = HookStoreProvider;
}

export const Context = context;
export const Provider = provider;
//#endregion store declaration