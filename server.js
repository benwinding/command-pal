var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic('./public', {
  setHeaders: setHeaders
})

// Set header to force download
function setHeaders (res, path) {
  res.setHeader('Content-Security-Policy', 'default-src http:');
  // res.setHeader('Content-Security-Policy', 'script-src https: \'unsafe-inline\'; style-src https: \'unsafe-inline\'');
}

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3009)