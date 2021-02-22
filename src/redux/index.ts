import { createStore } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
//开发环境 才引入 开发者工具

let store = createStore(reducer,composeWithDevTools());
// if (process.env.NODE_ENV === 'development') {
//     import('redux-devtools-extension').then((module) => {
//         store = createStore(reducer, module.composeWithDevTools());
//     });
// }
//DEBUG:
export default store;
