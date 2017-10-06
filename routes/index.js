var express = require('express');
var router = express.Router();

const request = require('request');
const cheerio = require('cheerio');

var url = [];
function buildURLs(){
  var show_re = /[^=show\/]([^\/]+)/;
  request('http://midnightsnacks.fm', (err, respond, body)=>{

    var $ = cheerio.load(body);

    $('.dates a').map(function(i, el){
      var link = $(this).attr('href');
      var showNum = show_re.exec(link)[0];

      //Only get shows after 11 since that's when show downloads started to happen...
      if(showNum >= 11){
        //After the 400th show switch naming convention to Midnight_Snacks-[showNumber]_[date].mp3
        if(showNum > 400){
          url.push('http://midnightsnacks.fm/archive/Midnight_Snacks-'+showNum+'_'+link.substr(-8)+'.mp3');
        }else{
          url.push('http://midnightsnacks.fm/archive/Midnight_Snacks-'+link.substr(-8)+'.mp3');
        }
      }

    });

  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  buildURLs();
  setTimeout(function(){
    res.render('index', { title: 'Express', url: url.reverse() });
    url = [];
  }, 2000);
});

module.exports = router;
