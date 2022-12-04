// deployed at https://enigmatic-eyrie-47722.herokuapp.com/

const express =require("express");

const app=express();

const bodyParser =require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


// this is used to get resonse from api dynamically
const https =require("https");

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html"); 
})



 app.post("/", function(req,res){
    
 //this to fetch response from api
 const query=req.body.cityName;
 const apiKey="eec8b9a4e19efee9153ac351165af1a3";
 const unit="metric";
 const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey+"";
 https.get(url, function(response){
     console.log(response.statusCode);

     // dealing especially with the data returned by api server 
     response.on("data",function(data){

         //we are converting hexadecimal "data" to string by using JSON 
         const weatherData=JSON.parse(data);
         console.log(weatherData);
         //extracting temp value from whole data. for this we put path of that required data  using JSON Viewer Extension in chrome
         const temperature= weatherData.main.temp;
         const weatherDescription =weatherData.weather[0].description

         // Openweather Api also sends a icon related to current weather with it in from of icon id 
         const icon=weatherData.weather[0].icon;
         // then create an image url consisting of icon id in it 
         const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

         
         //One app method can have only multiple "write" in it  and add "send" at last when all write are complete
         res.write("<h1>The weather currently is "+weatherDescription+" </h1>");
         res.write("<h1>The temperateure in "+query+" is "+temperature+" Degree celcius </h1>");
         res.write("<img src="+imageURL+">")
         res.send();

         // //One app method can have only one send in it  
         // res.send("<h1>The temperature of London is "+temperature+"F and weather is "+weatherDescription+"  </h1> ");
     }) 
 })


 })







// when we want to deploy any website, then server dynamically allocates port to it. So repace '3000' by "process.env.PORT"
app.listen(process.env.PORT  || 3000, function(){
    console.log("Serve is running at port number 3000");
})