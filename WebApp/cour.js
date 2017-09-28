var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  console.log(page)


  var params = querystring.parse(url.parse(req.url).query);
  console.log(params);

  if (page == '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>' +
    '<html>'+
    '    <head>'+
    '        <meta charset="utf-8" />'+
    '        <title>Ma page Node.js !</title>'+
    '    </head>'+
    '    <body>'+
    '     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
    '    </body>'+
    '</html>'); }
    else if (page == '/name') {
      res.writeHead(200, {"Content-Type": "text/html"});
      if ('prenom' in params && 'nom' in params) {
        res.write('<!DOCTYPE html>' +
        '<html>'+
        '    <head>'+
        '        <meta charset="utf-8" />'+
        '        <title>La solide page <name></title>'+
        '    </head>'+
        '    <body>'+
        '     	<p>Ton nom a toi c\'est ' + params['nom'] + ' et ton ptit prenom ' + params['prenom'] + '</p>'+
        '    </body>'+
        '</html>');
      }
      else {
        res.write('<!DOCTYPE html>' +
        '<html>'+
        '    <head>'+
        '        <meta charset="utf-8" />'+
        '        <title>La solide page <name></title>'+
        '    </head>'+
        '    <body>'+
        '     	<p>A tu un nom, bel inconnu?</p>'+
        '    </body>'+
        '</html>');
      }
    }
  else {
res.writeHead(404, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>' +
    '<html>'+
    '    <head>'  +
    '        <meta charset="utf-8" />'+
    '        <title>Casse toi d\'ici</title>'+
    '    </head>'+
    '    <body>'+
    '     	<p>T\'as rien a foutre la <g>fdp!</g></p>'+
    '    </body>'+
    '</html>'); }
      res.end();

});
server.listen(8080);
