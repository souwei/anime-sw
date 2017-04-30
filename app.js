var express = require('express');
var request = require('request');
var pgp = require('pg-promise')();
var PS = require('pg-promise').PreparedStatement;
var app = express();
var path = require('path');

var db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'anime_sw',
  user: 'souwei',
  password: 'test'
});

app.use(express.static(path.join(__dirname, 'views')));

var api_user = process.env.anime_user;
var api_pwd = process.env.anime_pwd;

var fs = require('fs'),
xml2js = require('xml2js');

var parser = new xml2js.Parser({explicitArray:false});

app.get('/api/anime',function(req,res){
  request(`https://${api_user}:${api_pwd}@myanimelist.net/api/anime/search.xml?q=${req.query['title']}`,function (error,
  animeResponse,body){
     if(body){
       parser.parseString(body, function (err, result) {
          result.anime.entry.forEach(function(entryData){
            copyToLocalDB(entryData);
          });
          res.send(result.anime.entry);
      });
    } else {
      res.send("Anime Not Found on MAL");
    }
  });
});

app.get('/',function(req,res){
  res.sendFile('home');
});

function copyToLocalDB(anime){
    var copyAnime = new PS('copy-anime','INSERT INTO anime(mal_id, title, episodes, mal_score, type, status, start_date, end_date, sypnopsis, image)\
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)');
    copyAnime.values = [anime.id,anime.title, anime.episodes, anime.score, anime.type, anime.status, anime.start_date, anime.end_date, anime.synopsis, anime.image];
    db.none(copyAnime)
    .then(function(data) {
        console.log("Successfully Copied Anime Data to Database")
    })
    .catch(function(error) {
        console.log(error);
    });
}

function searchLocalDB(animeTitle){
  //need to index title column
  var findAnime = new PS('find-anime', 'SELECT * FROM anime WHERE title ILIKE $1', animeTitle + '%');

  db.any(findAnime)
  .then(function(data) {
      if(data.length===0){
        console.log("nope_");
        return "Found nothing in local DB";

      }else{
        console.log("yepe_");
        return "Found Anime in Local DB";
      }
  })
  .catch(function(error) {
      console.log(error);
  });
}


module.exports = app;
