//Rending data from the server

require('babel-core/register');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var App = require('./src/index');

var config = require('./config');
var axios = require('axios');

require('node-jsx').install();


const serverRender = () => axios.get(`${config.serverUrl}/api/patients`).then(resp => {
  return {
    initialMarkup: ReactDOMServer.renderToString(React.createElement(App, { initialContests: resp.data })),
    initialData: resp.data
  };
});
module.exports= serverRender;
