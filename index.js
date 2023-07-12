const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
const App = require('./blockchain-finality-tester/App');


ReactDOM.render(
  React.createElement(React.StrictMode, {}, React.createElement(App)),
  document.getElementById('root')
);
