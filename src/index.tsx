import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import thunk from "redux-thunk";
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {getLocalStorage} from "./shared/utilities/localstorage";
import {composeEnhancers} from "./store/devTool";
import {initialState, reducer} from "./store/reducer";

const storage = getLocalStorage()

// get userData from localstorage to keep persistent login
const user = storage.getItem('user')
const userData = {
    ...initialState,
    userData: user ? user : initialState.userData
}

const store = createStore(
    reducer,
    userData,
    composeEnhancers('typeRacer')(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
