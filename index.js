const { config } = require('dotenv')
const { response } = require('express')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`)
})

app.get('/countryweather',async function (req, res) {
  let jscontract;
  if(req.query.cityname!=null)
    jscontract= await fetch('http://api.openweathermap.org/data/2.5/weather?q='+req.query.cityname+'&units=metric&appid='+process.env.API_TOKEN);
  console.log(jscontract)
   const dataresponse = await jscontract.json();
   //console.log(dataresponse);
   res.json(dataresponse);
})

app.get('/currentweather',async function (req, res) {
  let jscontract;
  if(req.query.cityname!=null)
    jscontract= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=${process.env.API_TOKEN}`)
  const dataresponse = await jscontract.json();
  res.json(dataresponse);
})