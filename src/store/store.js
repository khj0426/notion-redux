import { legacy_createStore } from 'redux';
import editorChild from './editorChildStore';
const store = legacy_createStore(editorChild);

export default store;
