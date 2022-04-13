import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

// const serviceApi = createServiceApi('/some/url')

// const thunkMiddlewareWithArg = thunkMiddleware.withExtraArgument({ serviceApi })

import rootReducer from "../reducers";

const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default Store;
