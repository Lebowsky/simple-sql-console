
import './index.css';
import './app';

// console.log('👋 This message is being logged by "renderer.js", included via webpack');
window.electronAPI.onSqlResponse((value: any) => {
  console.log(value)
})