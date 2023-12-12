import { default as App } from './App';
import './editor.css';
import './index.css';
import './document.css';
const $app = document.querySelector('#app');
// main.js가 시작점으로 잡고 App을 만든다.
const app = new App({
  $target: $app,
  initalState: [],
});
