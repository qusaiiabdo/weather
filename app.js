//const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-Parser");
const request=require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

        res.sendFile(__dirname+"/index.html")

    });
app.post("/",function(req,res){


       const query=req.body.cityName
     const apiKey="7bb471c15ef1c1f4ff8e4b6429af3130"
     const unit="metric"
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

     https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
          const weatherData=JSON.parse(data)
          const temp=weatherData.main.temp
          const icon=weatherData.weather[0].icon
          const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
          const desc=weatherData.weather[0].description
          res.write("<p>the weather currently is "+ desc+"</p>")
        res.write("<h1>the tempreture in "+query+" is : "+temp+" degreees celisius</h1>")    ;
        res.write("<img src="+imageUrl+">");
        res.send();
    })
        })
    })








app.listen(process.env.PORT||3000,function(){
    console.log("server is running on port 3000.");
})
