var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var md5 = require('md5');

var apiPublicKey = "1b42852d35dd8ab8d2ba998c597217b7";
var apiPrivateKey = "239f3704b0b16e60e9a7505f80202c9e980d553a";


/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.params) {
    console.log('should have no query string');
}
  else {
      console.log('should have query string');
  }
  
  var currentTimestamp= Date.now()
  var hash = md5(toString(currentTimestamp)+apiPrivateKey+apiPublicKey)
  console.log(req.query.page)

  var offsetResultBy = (req.query.page -1) *20
  

  var marvelApiEndpoint = "https://gateway.marvel.com/v1/public/characters?ts="+toString(currentTimestamp)+"&apikey="+apiPublicKey+"&hash="+hash+"&limit=20"+"&offset="+offsetResultBy
  console.log(marvelApiEndpoint)

  parse_obj = {characters:[]}

  fetch(marvelApiEndpoint)
  .then( res => {
    console.log(res.status)
    if (res.status ==200) { 
      return res.json()
    }
    else {
      throw new Error("Something went wrong")
    }
  })
  .then(resJSON => {
    for (var characters in resJSON['data']['results']){

      var currentName = resJSON['data']['results'][characters]['name']
      var currentImageLink = resJSON['data']['results'][characters]['thumbnail']['path'] +"/standard_large."+resJSON['data']['results'][characters]['thumbnail']['extension']

      parse_obj['characters'].push({"name":currentName,"thumbnail":currentImageLink});
    }    
  })
  .then( ()=>{
    res.send(parse_obj)
    .status(200)
  })
  .catch((error) => {
    console.log(error)
  });
});

module.exports = router;
