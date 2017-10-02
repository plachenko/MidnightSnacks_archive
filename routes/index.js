var express = require('express');
var router = express.Router();

const request = require('request');
const cheerio = require('cheerio');

var url = [];
function buildURLs(){
  request('http://midnightsnacks.fm', (err, respond, body)=>{
    var $ = cheerio.load(body);
    $('.week').map(function(i, el){
      url.push($(this).find('.dl').attr('href'));
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  buildURLs();
  setTimeout(function(){
    res.render('index', { title: 'Express', url: url.reverse() });
    url = [];
  }, 1000);
});

module.exports = router;
