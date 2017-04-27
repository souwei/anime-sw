var express = require('express');
var request = require('request');

var app = express();

var api_user = process.env.anime_user;
var api_pwd = process.env.anime_pwd;

app.get('/',function(req,res){
  request('https://'+api_user+':'+api_pwd+'@myanimelist.net/api/anime/search.xml?q='+req.query['title'],function (error,
  animeResponse,body){
    console.log(req.query);
    res.send(body);
    console.log(body);
  });
});

module.exports = app;
