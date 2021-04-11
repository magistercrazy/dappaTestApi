const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const lastMinted = 302;

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Dappa Dolls are ready for OpenSea!');
})

app.get('/api/creature/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const doll = db[tokenId]
  
  const data = {
    'name': doll.name,
    'attributes': doll.attributes,
    'image': doll.image,
    'description':doll.description,

  }
  res.send(data)
})

app.get('/api/factory/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id)
  const doll = db[(tokenId+lastMinted).toString()]
  
  const data = {
    'name': doll.name,
    'attributes': doll.attributes,
    'image': doll.image,
    'description':doll.description,

  }
  res.send(data)
})

app.get('/contract/DappaTest', function(req,res){
    const data = {
      'description': 'Dolls of the dollz.', 
      'image': 'https://lh3.googleusercontent.com/d9D0eQyrTMW4jiUevXGxnCivU29neaYHGFYRHtTyibcsJS7krz-iGIneGRW7x8OBqGWQofSXKXUiDTy1WB-ZtHbt7XA9gIWLFcJl1g=s0', 
      'name': 'Dappa Dolls Test'
    }
  res.send(data)
  
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
