import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import { rootSaga } from "./sagas/rootSaga";
/**
 * store.js
 * 
 * @abstract represents initial configuration of redux store and 
 * redux-saga middleware
 * @author Chase
 */

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// configures default store
const _configureStore = () => {

    // dev tools middleware
    const reduxDevTools =
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    // create a redux store with rootReducer and middleware
    const store = createStore(
        rootReducer,
        compose( applyMiddleware( sagaMiddleware), reduxDevTools)
    );

    // run the root saga
    sagaMiddleware.run( rootSaga);
    return store;
};

export default _configureStore;