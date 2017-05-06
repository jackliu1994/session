var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var options={path:'./haha',
	setpath:function(n){
	  this.path=n;
	}
};
function myFileStore(n){
	options.setpath(n);
	return new FileStore(options);
	
};
app.use(session({
    store: new myFileStore('./haha'),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

var server = app.listen(1331, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});