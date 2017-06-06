import 'es6-shim/es6-shim.js';

var context = require.context('./test', true, /\.spec\.js/);
context.keys().forEach(context);